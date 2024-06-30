const express = require('express');
const app = express();
const port = 3000;

// import body parser
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// import route posts pembayaran
const postsRouter = require('./routes/posts');
app.use('/pembayaran/posts', postsRouter);

// import route posts bendahara
const postsBendaharaRouter = require('./routes/posts-bendahara');
app.use('/bendahara/posts', postsBendaharaRouter);

// import route posts siswa
const postsSiswaRouter = require('./routes/posts-siswa');
app.use('/siswa/posts', postsSiswaRouter);

// import route wali murid siswa
const postsWaliRouter = require('./routes/posts-walimurid');
app.use('/walimurid/posts', postsWaliRouter);

// import route kepala sekolah siswa
const postsKepalaSekolahRouter = require('./routes/posts-kepalasekolah');
app.use('/kepalasekolah/posts', postsKepalaSekolahRouter);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
