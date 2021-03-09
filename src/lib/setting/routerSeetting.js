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
        if (endpointName) {
          if (
            methods[i] === 'getById' ||
            methods[i] === 'put' ||
            methods[i] === 'deleteById'
          ) {
            let checkEndPoint = endpointName.slice(-4);
            if (checkEndPoint !== '/:id')
              endpoints[methods[i]] = `${endpointName}/:id`;
            else endpoints[methods[i]] = endpointName;
          } else {
            endpoints[methods[i]] = endpointName;
          }
        } else {
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
  if (!confirm) await routerSettings(dbDetail);
  return endpoints;
}
module.exports = { routerSettings };
