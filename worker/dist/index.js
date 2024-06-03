"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
function processSubmisson(submission) {
    return __awaiter(this, void 0, void 0, function* () {
        const { probId, userId, lang } = JSON.parse(submission);
        console.log(`Processing submission for problemId ${probId}...`);
        console.log(`Code: ${userId}`);
        console.log(`Language: ${lang}`);
        yield new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Finished processing submission for problemId ${probId}.`);
    });
}
function startWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Worker connected to the redis server");
            while (true) {
                try {
                    const submission = yield client.brPop("problem", 0);
                    // @ts-ignore
                    yield processSubmisson(submission.element);
                }
                catch (e) {
                    console.log("error while processing submission");
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    });
}
startWorker();
