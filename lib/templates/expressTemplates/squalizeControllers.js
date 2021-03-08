function getAllLogic(tableName) {
  return `
  try {
    const respond = await ${tableName}.findAll({});
    res.status(200);
    res.send(respond);
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err);
  }`;
}

function getByIdLogic(tableName) {
  return `
   try {
    const respond = await ${tableName}.findAll({ where: { id: req.params.id } });
    res.status(200);
    res.send(respond);
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err);
  }`;
}

function postLogic(tableName) {
  return `
   try {
    const toAdd = { ...req.body };
    const respond = await ${tableName}.create(toAdd);
    res.status(201);
    res.send('${tableName} successfully added');
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err);
  }`;
}

function putLogic(tableName) {
  return `
  try {
    const idToUpdate = req.params.id;
    const exist = await ${tableName}.findAll({ where: { id: idToUpdate } });
    if (exist.length > 0) {
      const toUpdate = { ...req.body };
      const result = await ${tableName}.update( toUpdate,{ where: { id: idToUpdate } });
      res.status(200);
      res.send('${tableName} data related with id:' + idToUpdate + ' hast been updated');
    }else{
      res.status(404);
      res.send('${tableName} related with _id:' + idToUpdate + ' does not exist');
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err);
  }`;
}

function deleteLogic(tableName) {
  return `
 try {
    let result;
    const idToDelete = req.params.id;
    const exist = await ${tableName}.findAll({ where: { id: idToDelete } });
    if (exist.length > 0) {
      result = await ${tableName}.destroy({ where: { id: idToDelete } });
      res.status(200);
      res.send( ' new ${tableName} has been deleted');
    } else {
      res.status(204 );
      res.send('there is not any ${tableName} matchig that id');
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
