import express from 'express';
import apiRouter from './src/routers/apiRouter.js';
import cors from 'cors';
import connectDB from './src/config/dbConfig.js';

const PORT = 8080;

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/ping',(req,res)=>{
    console.log(req.user);
    return res.json({message : "Pong"})
});
app.use(cors());
app.use('/api',apiRouter);

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is listening at port ${PORT}`);
});

