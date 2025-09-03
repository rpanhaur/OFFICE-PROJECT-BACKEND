import { Response } from "express";
import { IRequest } from "../../middleware/types";
import sequelize from "../../database/connection";
import { QueryTypes } from "sequelize";

const createRoster = async (req: IRequest, res: Response) => {

    console.log(req.body, 'check check request');

    const { date, shift, start_at, end_at, notes } = req.body

    if (!date || !shift) {
        return res.status(400).json({

            message: 'Date and shift must required  '

        })
    }

    await sequelize.query(`CREATE TABLE IF NOT EXISTS rosters (

        id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
        date DATE NOT NULL,
        shift ENUM('MORNING','EVENING','MIDNIGHT') NOT NULL,
        start_at TIME NULL,
        end_at TIME NULL,
        notes TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        
        )`)


    const [results]: any = await sequelize.query(`INSERT INTO rosters (date,shift,start_at,end_at,notes) VALUES(?,?,?,?,?)`, {
        replacements: [date, shift, start_at, end_at, notes],
        type: QueryTypes.INSERT
    })

    res.status(200).json({
        message: 'Roster created ', results
    })

}

const assignShift = async (req: IRequest, res: Response) => {
    const { roster_id, employee_id, role, duty_status } = req.body;

    if (!roster_id || !employee_id || !role || !duty_status) {
        return res.status(400).json({
            message: "Required fields are necessary"
        });
    }

    // ✅ Create shift_assignments table if not exists
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS shift_assignments (
        id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
        roster_id CHAR(36) NOT NULL,
        employee_id CHAR(36) NOT NULL,
        role ENUM('ENGINEER','PRODUCER','ANCHOR','CAMERAMAN','TECHNICIAN','ELECTRICIAN','IT') NOT NULL,
        duty_status ENUM('ON_DUTY','OFFDAY_DUTY','LIVE_DUTY','LEAVE','WEEKLY_OFF','OTHERS') NOT NULL,
        check_in DATETIME NULL,
        check_out DATETIME NULL,
        tasks_completed INT DEFAULT 0,
        punctuality_score DECIMAL(5,2) DEFAULT 0,
        rating TINYINT NULL,
        remarks TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_roster FOREIGN KEY (roster_id) REFERENCES rosters(id) ON DELETE CASCADE,
        CONSTRAINT fk_employee FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
        CONSTRAINT unique_roster_employee UNIQUE (roster_id, employee_id)
      )
    `);

    // ✅ Insert assignment
    await sequelize.query(
        `INSERT INTO shift_assignments (roster_id, employee_id, role, duty_status) VALUES (?, ?, ?, ?)`,
        {
            type: QueryTypes.INSERT,
            replacements: [roster_id, employee_id, role, duty_status],
        }
    );

    return res.status(200).json({ message: "Employee assigned to shift" });
};


const updatePerformance = async (req: IRequest, res: Response) => {

    const { assignment_id, tasks_completed, punctuality_score, rating, remarks } = req.body;

    if (!assignment_id) {
        return res.status(400).json({ message: "assignment_id is required" });
    }

    await sequelize.query(
        `UPDATE shift_assignments
       SET tasks_completed = ?, punctuality_score = ?, rating = ?, remarks = ?, updatedAt = CURRENT_TIMESTAMP
       WHERE id = ?`,
        {
            type: QueryTypes.UPDATE,
            replacements: [tasks_completed, punctuality_score, rating, remarks, assignment_id],
        }
    );

    return res.status(200).json({ message: "Performance updated" });
}


const getMonthlyPerformance = async (req: IRequest, res: Response) => {
    const { month, year } = req.body;

    if (!month || !year) {
        return res.status(400).json({
            message: "month and year are required (e.g. month=8&year=2025)"
        });
    }

    try {
        const [results]: any = await sequelize.query(
            `SELECT 
          sa.employee_id,
          u.employeeName,
          COUNT(sa.id) AS total_shifts,
          SUM(sa.tasks_completed) AS total_tasks,
          AVG(sa.punctuality_score) AS avg_punctuality,
          AVG(sa.rating) AS avg_rating,
          GROUP_CONCAT(DISTINCT sa.duty_status) AS duty_statuses
        FROM shift_assignments sa
        JOIN rosters r ON sa.roster_id = r.id
        JOIN users u ON sa.employee_id = u.id
        WHERE MONTH(r.date) = ? AND YEAR(r.date) = ?
        GROUP BY sa.employee_id, u.employeeName
        ORDER BY total_shifts DESC`,
            {
                type: QueryTypes.SELECT,
                replacements: [month, year],
            }
        );

        return res.status(200).json({
            message: "Monthly performance report (all duty statuses)",
            data: results,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error generating report" });
    }
};

const getRosterWithAssignments = async (req: IRequest, res: Response) => {
    const { roster_id } = req.body;

    if (!roster_id) {
        return res.status(400).json({ message: "roster_id is required" });
    }

    try {
        const [results]: any = await sequelize.query(
            `SELECT 
                r.id AS roster_id,
                r.date,
                r.shift,
                r.start_at,
                r.end_at,
                r.notes,
                sa.id AS assignment_id,
                u.id AS employee_id,
                u.employeeName,
                sa.role,
                sa.duty_status,
                sa.check_in,
                sa.check_out,
                sa.tasks_completed,
                sa.punctuality_score,
                sa.rating,
                sa.remarks
            FROM rosters r
            LEFT JOIN shift_assignments sa ON r.id = sa.roster_id
            LEFT JOIN users u ON sa.employee_id = u.id
            WHERE r.id = ?`,
            {
                type: QueryTypes.SELECT,
                replacements: [roster_id],
            }
        );

        if (!results || results.length === 0) {
            return res.status(404).json({ message: "Roster not found" });
        }

        // 🛠️ Optional: group employees under the same roster
        const roster = {
            roster_id: results[0].roster_id,
            date: results[0].date,
            shift: results[0].shift,
            start_at: results[0].start_at,
            end_at: results[0].end_at,
            notes: results[0].notes,
            employees: results
                .filter((row: any) => row.employee_id) // remove null if no assignments
                .map((row: any) => ({
                    assignment_id: row.assignment_id,
                    employee_id: row.employee_id,
                    employeeName: row.employeeName,
                    role: row.role,
                    duty_status: row.duty_status,
                    check_in: row.check_in,
                    check_out: row.check_out,
                    tasks_completed: row.tasks_completed,
                    punctuality_score: row.punctuality_score,
                    rating: row.rating,
                    remarks: row.remarks,
                })),
        };

        return res.status(200).json({
            message: "Roster with assigned employees",
            data: roster,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching roster with assignments" });
    }
};






export { createRoster, assignShift, updatePerformance, getMonthlyPerformance, getRosterWithAssignments }