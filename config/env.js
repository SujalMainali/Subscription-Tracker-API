//THis is an environment variables file. The specific configurations like listening port of server and other stuff may vary depending upon the environment
//SO, it is curcial to keep these important configurations saved in a file so different configuration can be used as required.


import { config } from 'dotenv';

//This is the path to the required environment file where the required configurations is saved.
//We can specify many alternative paths.
//The contents of one of these file is copied to process.env parameters and can be accessed from any file
//The process.env.NODE_ENV is not present at the beginning and can be set to 'production' when we want to run the code with production configuration
config({path:`.env.${process.env.NODE_ENV || 'development'}.local`});


export const {
    PORT, NODE_ENV, 
    DB_URI,JWT_SECRET,
    JWT_EXPIRES_IN,SERVER_URL,
    ARCJET_KEY,ARCJET_ENV,
    QSTASH_URL,QSTASH_TOKEN,
    QSTASH_CURRENT_SIGNING_KEY,
    QSTASH_NEXT_SIGNING_KEY,
    EMAIL,EMAIL_PASSWORD
}=process.env;
