const router = require('./questions/routerQuestions')
const index = require('./questions/indexQuestions')
const db = require('./questions/databaseQuestions')
const koaCreator = require('./filesCreator/koaFileCreator')
const expressCreator = require('./filesCreator/expressFileCreator')
const mongooseSchema = require ('./questions/mongooseQuestions')
const folderquestion = require ('./questions/newFile')
const packagesInstallation = require ('./packageInstalation')
const indexdata ={};
const endpoints ={}
const dbDetail = {}
const fileName="";

async function newFolder(){
    fileName = await folderquestion.filequestion()
}
  
async function apiSettings (){
    await indexSettings()
    console.log("indexdata", indexdata)
    await databaseSettings()
    console.log("dbDetail", dbDetail)
    await routerSettings()
    console.log("endpoints", endpoints)
    if(indexdata.framework ==="koa")
    await koaCreator.koaCreator(indexdata, endpoints, dbDetail)
    if(indexdata.framework ==="express")
    await expressCreator.expressCreator(indexdata, endpoints, dbDetail)   
    packagesInstallation.run(indexdata.framework, dbDetail.type)
}

async function indexSettings(){
 indexdata.framework = await index.framework()
 indexdata.port = await index.port()
 return indexdata
}


 async function routerSettings () {
  const newRouter = await router.creatingRouter()
  if(newRouter){
    let methods  =  await router.creatingMethods()
    if(methods[0]){
      for(let i = 0; i < methods.length; i++){
       let endpointName =  await router.endPoints(methods[i])
       if(endpointName) endpoints[methods[i]] = endpointName
       else {
         if(methods[i] === "getById" || methods[i] === "put" || methods[i] === "deleteById")
         endpoints[methods[i]] =  `${methods[i]}/${dbDetail.collection}/:id`
         else endpoints[methods[i]] =  `${methods[i]}/${dbDetail.collection}`
       }
      }
    }
  }
  return endpoints
}

async function databaseSettings(){
 let newDatabase = await db.databaseConection()
 if(newDatabase)
dbDetail.type = await db.dataBaseType()
dbDetail.name = await db.databaseName()
if(dbDetail.type === "mongoose"){
  dbDetail.collection = await mongooseSchema.databaseCollectionName()
  let wantSquema= await mongooseSchema.newSchema()
  if(wantSquema) dbDetail.schema = await mongooseSchema.schemaContent()
}else if(dbDetail.type === "MySQL"){
  console.log("it is not WORKING yet")
}
return dbDetail
}


module.exports = {apiSettings,newFolder}
