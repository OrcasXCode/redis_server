import express from "express"
import { createClient } from "redis"

const app=express();
app.use(express.json());


const client=createClient();

app.post("/submit",async(req,res)=>{
    const probId=req.body.probId;
    const userId=req.body.userId;
    const lang=req.body.lang; 

    try{
        await client.lPush("problem",JSON.stringify({probId,userId,lang}));
        return res.status(200).json({
            msg:"Submission received and stored."
        })
    }
    catch(e){
        return res.status(500).json({
            msg:"Server Error , Failed to push in queue"
        })
    }

})


async function startServer(){
    await client.connect();
    app.listen(3000,()=>{
        console.log("Server is running on PORT 3000");
    })
}


startServer();


