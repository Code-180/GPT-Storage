import fs from "fs";
import 'dotenv/config';
import OpenAI from "openai";
import express from 'express';
//+++++++++++++++++++++++++++++++++++++++++++++++
const app = express();
const openai = new OpenAI({
    apiKey: process.env.KEY
});
//+++++++++++++++++++++++++++++++++++++++++++++++
//Upload File
//+++++++++++++++++++++++++++++++++++++++++++++++
app.post('/upload-file', async (req, res) => {
    //+++++++++++++++++++++++++++++++++++++++++++++++
    let resData = {
        status: false,
        data: {},
        message: ''
    }
    try {
        //+++++++++++++++++++++++++++++++++++++++++++++++
        const file = await openai.files.create({
            file: fs.createReadStream("mydata.jsonl", { encoding: "utf8", flag: "r" }),
            purpose: "fine-tune",
        });
        //+++++++++++++++++++++++++++++++++++++++++++++++
        resData.data = file;
        resData.status = true;
        resData.message = 'Success!!';
        res.status(200).json(resData);
        //+++++++++++++++++++++++++++++++++++++++++++++++
    } catch (error) {
        //+++++++++++++++++++++++++++++++++++++++++++++++
        resData.data = JSON.stringify(error);
        resData.status = false;
        resData.message = 'Fail!!';
        res.status(200).json(resData);
        //+++++++++++++++++++++++++++++++++++++++++++++++
    }
})
//+++++++++++++++++++++++++++++++++++++++++++++++
//List Files
//+++++++++++++++++++++++++++++++++++++++++++++++
app.get('/list-files', async (req, res) => {
    //+++++++++++++++++++++++++++++++++++++++++++++++
    let resData = {
        status: false,
        data: {},
        message: ''
    }
    try {
        //+++++++++++++++++++++++++++++++++++++++++++++++
        const list = await openai.files.list();
        //+++++++++++++++++++++++++++++++++++++++++++++++
        resData.data = list;
        resData.status = true;
        resData.message = 'Success!!';
        res.status(200).json(resData);
        //+++++++++++++++++++++++++++++++++++++++++++++++
    } catch (error) {
        //+++++++++++++++++++++++++++++++++++++++++++++++
        resData.data = JSON.stringify(error);
        resData.status = false;
        resData.message = 'Fail!!';
        res.status(200).json(resData);
        //+++++++++++++++++++++++++++++++++++++++++++++++
    }
})
//+++++++++++++++++++++++++++++++++++++++++++++++
//Retrive Files
//+++++++++++++++++++++++++++++++++++++++++++++++
app.get('/retrive-file', async (req, res) => {
    //+++++++++++++++++++++++++++++++++++++++++++++++
    let resData = {
        status: false,
        data: {},
        message: ''
    }
    try {
        //+++++++++++++++++++++++++++++++++++++++++++++++
        const file = await openai.files.retrieve("file-d6nFKzJXHCrazysrrA5tKIk4");
        //+++++++++++++++++++++++++++++++++++++++++++++++
        resData.data = file;
        resData.status = true;
        resData.message = 'Success!!';
        res.status(200).json(resData);
        //+++++++++++++++++++++++++++++++++++++++++++++++
    } catch (error) {
        //+++++++++++++++++++++++++++++++++++++++++++++++
        resData.data = JSON.stringify(error);
        resData.status = false;
        resData.message = 'Fail!!';
        res.status(200).json(resData);
        //+++++++++++++++++++++++++++++++++++++++++++++++
    }
})
//+++++++++++++++++++++++++++++++++++++++++++++++
//Retrive Files Content (Downloading of fine-tune training files is disabled for free accounts.)
// +++++++++++++++++++++++++++++++++++++++++++++++
app.get('/retrive-file-content', async (req, res) => {
    //+++++++++++++++++++++++++++++++++++++++++++++++
    let resData = {
        status: false,
        data: {},
        message: ''
    }
    try {
        //+++++++++++++++++++++++++++++++++++++++++++++++
        const file = await openai.files.content("file-D9ViqocNq4C0YsdatxIJ9ETa");
        //+++++++++++++++++++++++++++++++++++++++++++++++
        resData.data = file;
        resData.status = true;
        resData.message = 'Success!!';
        res.status(200).json(resData);
        //+++++++++++++++++++++++++++++++++++++++++++++++
    } catch (error) {
        //+++++++++++++++++++++++++++++++++++++++++++++++
        resData.data = JSON.stringify(error);
        resData.status = false;
        resData.message = 'Fail!!';
        res.status(200).json(resData);
        //+++++++++++++++++++++++++++++++++++++++++++++++
    }
})
//+++++++++++++++++++++++++++++++++++++++++++++++
//Delete File
//+++++++++++++++++++++++++++++++++++++++++++++++
app.delete('/delete-file', async (req, res) => {
    //+++++++++++++++++++++++++++++++++++++++++++++++
    let resData = {
        status: false,
        data: {},
        message: ''
    }
    try {
        //+++++++++++++++++++++++++++++++++++++++++++++++
        const file = await openai.files.del("file-d6nFKzJXHCrazysrrA5tKIk4");
        //+++++++++++++++++++++++++++++++++++++++++++++++
        resData.data = file;
        resData.status = true;
        resData.message = 'Success!!';
        res.status(200).json(resData);
        //+++++++++++++++++++++++++++++++++++++++++++++++
    } catch (error) {
        //+++++++++++++++++++++++++++++++++++++++++++++++
        resData.data = JSON.stringify(error);
        resData.status = false;
        resData.message = 'Fail!!';
        res.status(200).json(resData);
        //+++++++++++++++++++++++++++++++++++++++++++++++
    }
})
//+++++++++++++++++++++++++++++++++++++++++++++++
//Server
//+++++++++++++++++++++++++++++++++++++++++++++++
const port = 3000;
//+++++++++++++++++++++++++++++++++++++++++++++++
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})