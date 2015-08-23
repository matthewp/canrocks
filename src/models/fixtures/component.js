import fixture from 'can-connect/fixture/';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /api/component': store.findAll,
  'GET /api/component/{id}': store.findOne,
  'POST /api/component': store.create,
  'PUT /api/component/{id}': store.update,
  'DELETE /api/component/{id}': store.destroy
});

export default store;

