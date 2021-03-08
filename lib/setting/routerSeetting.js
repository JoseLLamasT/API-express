const router = require('../questions/routerQuestions');
const confirmation = require('../questions/newFile');

const endpoints = {};
async function routerSettings(dbDetail) {
  if (!dbDetail.collection) dbDetail.collection = dbDetail.table;
  const newRouter = await router.creatingRouter();
  if (newRouter) {
    let methods = await router.creatingMethods();
    if (methods[0]) {
      for (let i = 0; i < methods.length; i++) {
        let endpointName = await router.endPoints(methods[i]);
        if (endpointName) endpoints[methods[i]] = endpointName;
        else {
          if (
            methods[i] === 'getById' ||
            methods[i] === 'put' ||
            methods[i] === 'deleteById'
          )
            endpoints[methods[i]] = `${methods[i]}/${dbDetail.collection}/:id`;
          else endpoints[methods[i]] = `${methods[i]}/${dbDetail.collection}`;
        }
      }
    }
  }
  console.log(endpoints);
  let confirm = await confirmation.agree();
  if (!confirm) await routerSettings();
  return endpoints;
}
module.exports = { routerSettings };
