function getAllLogic(tableName) {
  return `
  try {
    const respond = await ${tableName}.findAll({});
    ctx.status =200;
    ctx.body =respond;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = err;
  }`;
}

function getByIdLogic(tableName) {
  return `
   try {
    const { id } = ctx.params
    const respond = await ${tableName}.findAll({ where: { id: id } });
    if(respond.length > 0 ){
      ctx.status = 200;
      ctx.body = respond;
    }else{
      ctx.status = 404;
      ctx.body = "there is not ${tableName} relatad with the id: " + id;
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = err;
  }`;
}

function postLogic(tableName) {
  return `
   try {
    const toAdd = { ...ctx.request.body };
    const respond = await ${tableName}.create(toAdd);
    ctx.status = 201;
    ctx.body = 'new ${tableName} has been added';
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = err;
  }`;
}

function putLogic(tableName) {
  return `
  try {
    const { id } = ctx.params
    const newData = { ...ctx.request.body }

    const exist = await ${tableName}.findAll({ where: { id: id } });
    if (exist.length > 0) {
      const result = await ${tableName}.update(newData, { where: { id: id} });
        ctx.status = 200 ;
        ctx.body = '${tableName} with id:' + id + ' hast been updated';
    }else{
      ctx.status = 404;
      ctx.body = 'does not exist any ${tableName} related with id:' + id;
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = err;
  }`;
}

function deleteLogic(tableName) {
  return `
 try {
    let result;
    const  { id } = ctx.params
    const exist = await ${tableName}.findAll({ where: { id: id } });
    if (exist.length > 0) {
      result = await ${tableName}.destroy({ where: { id: id } });
      ctx.status = 200;
      ctx.body = 'a ${tableName} been deleted';
    } else {
      ctx.status = 404;
      ctx.body = 'does not exist any ${tableName} related with id:' + id;
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.send = err;
  }`;
}

module.exports = {
  getAllLogic,
  postLogic,
  getByIdLogic,
  putLogic,
  deleteLogic,
};
