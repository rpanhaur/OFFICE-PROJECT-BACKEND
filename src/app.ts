import express from 'express'
import router from './routes/authRoutes'

const userRouter=router
const app=express()
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/api',userRouter)


export default app 