//We need to import the Client class from the upstash package as it contains the message required to talk with the Upstash's workflow API
import { Client as workflow } from "@upstash/workflow";


import { QSTASH_TOKEN,QSTASH_URL } from "./env.js";


//We create this object of the workflowCLient class with the URL and the TOKEN.
//We now import this object everywhere we need to use the workflow API.
export const workflowClient= new workflow({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN,
});