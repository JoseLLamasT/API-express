function getAllLogic() {
  return `
  try {
    const respond = await db.find();
    ctx.status(200);
    ctx.body(respond);
  } catch (err) {
    console.log(err);
    ctx.status(500);
    ctx.body(err);
  }`;
}

function getByIdLogic() {
  return `
  try {
    const { id } = ctx.params;
    const respond = await db.findOne({ _id: id });
    ctx.status(200);
    ctx.body(respond);
  } catch (err) {
    console.log(err);
    ctx.status(500);
    ctx.body(err);
  }`;
}

function postLogic() {
  return `
  try {
    const toAdd = { ...ctx.request.body };
    const respond = await db.create(toAdd);
    ctx.status(201);
    ctx.body(respond +
         has been added);
  } catch (err) {
    console.log(err);
    ctx.status(500);
    ctx.body(err);
  }`;
}

function putLogic() {
  return `
 try {
    const newData = { ...ctx.request.body };
    const update = ctx.params.id;
    const respond = await db.findByIdAndUpdate(update, newData);
    ctx.status(200);
    ctx.body(data related with _id:' + update.id + ' hast been updated');
  } catch (err) {
    console.log(err);
    ctx.status(500);
    ctx.body(err);
  }`;
}

function deleteLogic() {
  return `
  try {
    const id = ctx.params;
    const respond = await db.findOne({ _id: id });
    if (respond) {
      let result = await db.findByIdAndRemove(id);
      res.status(200);
      res.send( result +
              has been deleted)
    } else {
      res.status(404);
      res.send('there is not any data matchig that id');
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err);
  }`;
}

module.exports = {
  getAllLogic,
  postLogic,
  getByIdLogic,
  putLogic,
  deleteLogic,
};
