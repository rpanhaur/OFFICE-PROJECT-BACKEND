import express from 'express'
import cors from 'cors'
import router from './routes/authRoutes'
import employeeRouter from './routes/employee-details/employee-router'
import assignShiftRouter from './routes/roster/assignShift-router'
import updatePerformanceRouter from './routes/roster/updatePerformace-router'
import monthlyPerformanceRouter from './routes/roster/monthlyPerformance-router'
import rosterWithAssignment from './routes/roster/roster-with-assignment-router'
import createRosterRouter from './routes/roster/createRoster-router'




const userRouter = router
const app = express()

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json());

// Debug middleware to log incoming request bodies
// app.use((req, res, next) => {
//     console.log("🔹 Incoming Request:");
//     console.log("Method:", req.method);
//     console.log("URL:", req.url);
//     console.log("Headers:", req.headers);
//     console.log("Body:", req.body);
//     next();
// });



app.use('/api/auth', userRouter)
app.use('/api', employeeRouter)
app.use('/api', createRosterRouter)
app.use('/api', assignShiftRouter)
app.use('/api', updatePerformanceRouter)
app.use('/api', monthlyPerformanceRouter)
app.use('/api', rosterWithAssignment)



export default app 