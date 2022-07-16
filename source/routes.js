const {
  menyimpanbuku, tampilseluruhbuku, tampildetailbuku, ubahdatabuku, hapusbuku,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: menyimpanbuku,
  },
  {
    method: 'GET',
    path: '/books',
    handler: tampilseluruhbuku,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: tampildetailbuku,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: ubahdatabuku,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: hapusbuku,
  },
];

module.exports = routes;
