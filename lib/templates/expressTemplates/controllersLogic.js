function getAllLogic() {
  return (
   `try {
         const respond = await db.find();
         res.status(200);
         res.send(respond);
    } catch (err) {
         console.log(err);
         res.status(500);
         res.send(err);
  }`
 )
}

function getByIdLogic() {
  return (
   `try {
         const { id } = req.params;
         const respond = await db.findOne({ _id: id });
         res.status(200);
         res.body(respond);
    } catch (err) {
         console.log(err);
         res.status(500);
         res.send(err);
    }`
  )
}

function postLogic() {
  return (
   `try {
         const toAdd = { ...req.body };
         let check = await db.findOne({ _id: toAdd.id });
         if (check) throw new Error();

         const respond = await db.create(toAdd);
         res.status(201);
         res.send(respond + '  has been added');
    } catch (err) {
         console.log(err);
         res.status(500);
         res.send(err);
    }`
  );
}

function putLogic() {
  return (
   `try {
         const newData = { ...req.body };
         const update = req.params.id;
         const respond = await db.findByIdAndUpdate(update, newData);
         res.status(200);
         res.send(respond);
    } catch (err) {
         console.log(err);
         res.status(500);
         res.send(err);
    }`
  )
}

function deleteLogic() {
  return (
   `try {
         const toDelete = req.params.id;
         await db.findOneAndRemove(toDelete);
         res.status(204);
         res.send('the data with id: ' + toDelete + ' has been deleted');
    } catch (err) {
         console.log(err);
         res.status(500);
         res.send(err);
    }`
  )
}

module.exports = {
  getAllLogic,
  postLogic,
  getByIdLogic,
  putLogic,
  deleteLogic,
};
