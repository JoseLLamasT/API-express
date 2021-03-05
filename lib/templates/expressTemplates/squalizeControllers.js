function getAllLogic() {
  return `
  try {
    const respond = await db.findAll({});
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
    const respond = await db.findAll({ where: { id: req.params.id } });
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
    res.send(respond + ' has been added');
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err);
  }`;
}

function putLogic() {
  return `
  try {
    const result = await db.update(
      { title: 'a very different title now' },
      { where: { _id: 1 } }
    );
    res.status(200);
    res.send('data related with _id:' + req.params.id + ' hast been updated');
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err);
  }`;
}

function deleteLogic() {
  return `
 try {
    let result;
    const exist = await db.findAll({ where: { id: req.params.id } });
    if (exist) {
      result = await db.destroy({ where: { id: req.params.id } });
      res.status(200);
      res.send(result + 'has been deleted');
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
