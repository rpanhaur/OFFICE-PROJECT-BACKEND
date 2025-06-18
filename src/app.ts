import express from 'express'
import router from './routes/authRoutes'
import instituteRouter from './routes/institute/instituteRouter';
import courseRouter from './routes/course/courseRouter';

const userRouter=router
const app=express()
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/api',userRouter)
app.use('/api',instituteRouter)
app.use('/api',courseRouter)


export default app 