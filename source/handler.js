const { nanoid } = require('nanoid');
const books = require('./bukubuku.js');

const menyimpanbuku = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  	} = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  if (name === undefined) {
  	  const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
  	  	  const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const databaru = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  books.push(databaru);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const tampilseluruhbuku = (request, h) => {
  const { name, reading, finished } = request.query;

  let pilihbuku = books;
  if (name !== undefined) {
    pilihbuku = books.filter((buku) => buku.name.toUpperCase().includes(name.toUpperCase()));
  }else if(reading !== undefined) {
    pilihbuku = books.filter((buku) => buku.reading === !!Number(reading));
  }else if (finished !== undefined) {
    pilihbuku = books.filter((buku) => buku.finished === !!Number(finished));
  }
  const response = h.response({
    status: 'success',
    data: {
      books: pilihbuku.map((buku) => ({
        id: buku.id,
        name: buku.name,
        publisher: buku.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const tampildetailbuku = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((buku) => buku.id === bookId)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);

  return response;
};

const ubahdatabuku = (request, h) => {
  const { bookId } = request.params;

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((buku) => buku.id === bookId);
  if (index !== -1) {
    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const hapusbuku = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((buku) => buku.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  menyimpanbuku,
  tampilseluruhbuku,
  tampildetailbuku,
  ubahdatabuku,
  hapusbuku,
};
