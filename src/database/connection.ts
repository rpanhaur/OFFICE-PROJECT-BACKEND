import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";


const sequelize=new Sequelize({

database:envConfig.dbName,
username:envConfig.dbUserName,
password:envConfig.dbPassword,
host:envConfig.host,
dialect:"mysql",
port:3306,
models:[__dirname +'/models']

})
sequelize.authenticate().then(()=>{
  console.log('Database is Connected');
  
}).catch((error)=>{
  console.log('Something is Wrong' +error);
  
})

sequelize.sync({alter:true}).then(()=>{
  console.log('Database is Migrated Successfully');
  
})


export default sequelize