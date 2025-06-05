import {config} from 'dotenv'

config()
export const envConfig={
  portNumber:process.env.PORT,
  dbName:process.env.DB_NAME,
  dbUserName:process.env.DB_USERNAME,
  dbPassword:process.env.DB_PASSWORD,

  host:process.env.HOST

 




}