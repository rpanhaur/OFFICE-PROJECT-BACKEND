import express from 'express'
import router from './routes/authRoutes'
import instituteRouter from './routes/institute/instituteRouter';
import courseRouter from './routes/institute/course/courseRouter';
import teacherRouter from './routes/institute/teacher/teacherRoutes';
import studentRouter from './routes/institute/student/studentRoutes';
import categoryRouter from './routes/institute/category/categoryRoutes';

const userRouter=router
const app=express()
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/api',userRouter)
app.use('/api',instituteRouter)
app.use('/api',courseRouter)
app.use('/api',teacherRouter)
app.use('/api',studentRouter)
app.use('/api',categoryRouter)


export default app 