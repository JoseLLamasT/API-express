function getAllLogic() {
  return `
  try {
    const respond = await db.find();
    res.status(200);
    res.send(respond);
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err);
  }`;
}

function getByIdLogic() {
  return `
  try {
    const { id } = req.params;
    const respond = await db.findOne({ _id: id });
    res.status(200);
    res.send(respond);
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err);
  }`;
}

function postLogic() {
  return `
  try {
    const toAdd = { ...req.body };
    const respond = await db.create(toAdd);
    res.status(201);
    res.send(respond +
         ' has been added');
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err);
  }`;
}

function putLogic() {
  return `
 try {
    const newData = { ...req.body };
    const update = req.params.id;
    const respond = await db.findByIdAndUpdate(update, newData);
    res.status(200);
    res.send('data related with _id:' + update + ' hast been updated');
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err);
  }`;
}

function deleteLogic() {
  return `
  try {
    const id = req.params.id;
    const respond = await db.findOne({ _id: id });
    if (respond) {
      let result = await db.findByIdAndRemove(id);
      res.status(200);
      res.send( result +
              'has been deleted')
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
