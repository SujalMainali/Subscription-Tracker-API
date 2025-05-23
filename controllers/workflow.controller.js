import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const {serve}= require('@upstash/workflow/express');

const Remainders=[7,5,3,1];

import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js';
//Wrapping the function with serve() allows us to use the function with Upstash API easily without many boilerplate code.
//The serve function reads the incoming HTTP request, validates any QStash signature and build a single context object.
//So, we dont need to parse the request body ourselves.
export const sendReminders= serve(async(context)=>{ //THis context is the same JSON body we specified when we publish a workflow (Check the createSubscription function in subscription.controller.js)                        
    //Parsing the subscriptionId from the request payload. We have passed the subscriptionId in the body of the request when we trigger the workflow in createSubscription function.                                                    
    const { subscriptionId }=context.requestPayload;
    const subscription= await fetchSubscriptionById(context,subscriptionId);

    if(!subscription || subscription.status!=='active') {
        console.log(`Subscription not found or not active ${subscriptionId}`);
        return;
    }


    const renewalDate= new Date(subscription.renewalDate);
    const now=Date.now();

    if(renewalDate.getTime()<=now){
        console.log(`RenewalDate has passed ${subscriptionId}`);
        return;
    }
    
    for (const daysBefore of Remainders){
        const remainderDate=new Date(renewalDate);
        remainderDate.setDate(remainderDate.getDate()-daysBefore);

        const remainderDateOnly = new Date(remainderDate.getFullYear(), remainderDate.getMonth(), remainderDate.getDate());
        const nowDateOnly = new Date(new Date(now).getFullYear(), new Date(now).getMonth(), new Date(now).getDate());

        if (remainderDateOnly < nowDateOnly) {
            continue;
        } else {
            await sleepUntillRemainder(context,`Remainder ${daysBefore} days before`,remainderDate);
        }
        await triggerRemainder(context,`Remainder ${daysBefore} days before`,subscription);
    }

});

const fetchSubscriptionById= async(context,subscriptionId)=>{
    return await context.run('get subscription',async ()=>{
        return await Subscription.findById(subscriptionId).populate('user')
    })
}

const sleepUntillRemainder= async (context,label,date)=>{
    console.log(`Sleeping until ${date} for ${label}`);
    await context.sleepUntil(label,date);
}

const triggerRemainder= async (context,label,subscription)=>{
    return await context.run(label,async()=>{
        console.log(`Triggering ${label} remainder`);
        console.log(`Sending email to ${subscription.user.email}`);
        await sendReminderEmail(subscription.user.email,subscription);
    })
}