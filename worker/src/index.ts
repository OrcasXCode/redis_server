import { createClient } from "redis";
const client=createClient();


async function processSubmisson(submission:string) {
    const {probId,userId,lang}=JSON.parse(submission);
    console.log(`Processing submission for problemId ${probId}...`);
    console.log(`Code: ${userId}`);
    console.log(`Language: ${lang}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Finished processing submission for problemId ${probId}.`);
}

async function startWorker(){
    try{
        await client.connect();
        console.log("Worker connected to the redis server");
        while(true){
            try{
                const submission=await client.brPop("problem",0);
                // @ts-ignore
                await processSubmisson(submission.element);
            }
            catch(e){
                console.log("error while processing submission")
            }
        }
    }
    catch(e){
        console.log(e);
    }
}

startWorker();