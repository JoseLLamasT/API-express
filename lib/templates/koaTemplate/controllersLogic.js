function getAllLogic() {
  return (
   `try {
         const respond = await db.find();
         ctx.status(200);
         ctx.body(respond);
    } catch (err) {
         console.log(err);
         ctx.status(500);
         ctx.send(err);
  }`
 )
}

function getByIdLogic() {
  return (
   `try {
         const { id } = ctx.params;
         const respond = await db.findOne({ _id: id });
         ctx.status(200);
         ctx.body(respond);
    } catch (err) {
         console.log(err);
         ctx.status(500);
         ctx.send(err);
    }`
  )
}

function postLogic() {
  return (
   `try {
         const toAdd = { ...ctx.request.body };
         let check = await db.findOne({ _id: toAdd.id });
         if (check) throw new Error();

         const respond = await db.create(toAdd);
         ctx.status(201);
         ctx.send(respond + '  has been added');
    } catch (err) {
         console.log(err);
         ctx.status(500);
         ctx.send(err);
    }`
  );
}

function putLogic() {
  return (
   `try {
         const newData = { ...ctx.request.body };
         const update = ctx.params.id;
         const respond = await db.findByIdAndUpdate(update, newData);
         ctx.status(201);
         ctx.send(respond);
    } catch (err) {
         console.log(err);
         ctx.status(500);
         ctx.send(err);
    }`
  )
}

function deleteLogic() {
  return (
   `try {
         const toDelete = ctx.params.id;
         await db.findOneAndRemove(toDelete);
         ctx.status(201);
         ctx.send('the data with id: ' + toDelete + ' has been deleted');
    } catch (err) {
         console.log(err);
         ctx.status(500);
         ctx.send(err);
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
