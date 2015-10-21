import fixture from 'can-fixture';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /api/maintainer': store.findAll,
  'GET /api/maintainer/{id}': store.findOne,
  'POST /api/maintainer': store.create,
  'PUT /api/maintainer/{id}': store.update,
  'DELETE /api/maintainer/{id}': store.destroy
});

export default store;

