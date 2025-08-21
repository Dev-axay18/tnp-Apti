import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

const app = new express();

app.use(cookieParser());
app.use(cors({
    origin:"*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))
app.use(express.json({ limit: '50kb'}))
app.use(express.urlencoded({ extended: true, limit: '50kb' }))

//all routes are imported here
import userRouter from './src/routes/users.routes.js';
import eventRouter from './src/routes/events.routes.js';
import certificateRouter from './src/routes/certificates.routes.js';
import adminRouter from './src/routes/admin.routes.js';
import registrationRouter from './src/routes/registartion.routes.js';


app.use('/api/auth', userRouter);
app.use('/api/events',eventRouter)
app.use('/api/certificates',certificateRouter)
app.use('/api',adminRouter)
app.use('/api/registrations',registrationRouter)

export default app;