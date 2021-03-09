function getAllLogic() {
  return `
  try {
    const respond = await db.find();
    ctx.status = 200;
    ctx.body = respond;
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = err;
  }`;
}

function getByIdLogic() {
  return `
  try {
    const { id } = ctx.params;
    const respond = await db.findOne({ _id: id });
    if(respond){
      ctx.status = 200;
      ctx.body = respond;
    }else{
      ctx.status = 404
      ctx.body = "there is not data relatad with the id: " + id
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500 ;
    ctx.body = err;
  }`;
}

function postLogic() {
  return `
  try {
    const toAdd = { ...ctx.request.body };
    const respond = await db.create(toAdd);
    ctx.status =201;
    ctx.body = respond + '         has been added';
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = err;
  }`;
}

function putLogic() {
  return `
 try {
    const newData = { ...ctx.request.body };
    const id = ctx.params.id;

    const respond = await db.findOne({ _id: id });
    if(respond){
      await db.findByIdAndUpdate(id, newData);
      ctx.status = 200;
      ctx.body ='data related with _id:' + id + ' hast been updated';
    }else{
      ctx.status = 404
      ctx.body = "there is not data relatad with the id: " + id
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = err;
  }`;
}

function deleteLogic() {
  return `
  try {
    const {id} = ctx.params;
    const respond = await db.findOne({ _id: id });
    if (respond) {
      const deleted = await db.findByIdAndRemove(id);
      ctx.status = 200;
      ctx.body = deleted + '         has been deleted'
    } else {
      ctx.status = 404;
      ctx.body = 'there is not any data matchig with that id';
    }
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = err;
  }`;
}

module.exports = {
  getAllLogic,
  postLogic,
  getByIdLogic,
  putLogic,
  deleteLogic,
};
