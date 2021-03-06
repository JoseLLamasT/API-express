const router = require('../questions/routerQuestions');

const endpoints = {};
async function routerSettings(dbDetail) {
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
  return endpoints;
}
module.exports = { routerSettings };
