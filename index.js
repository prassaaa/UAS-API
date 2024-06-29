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
app.use('/pembayaran/posts', postsRouter); // use route posts di Express

// import route posts bendahara
const postsBendaharaRouter = require('./routes/posts-bendahara');
app.use('/bendahara/posts', postsBendaharaRouter); // use route posts bendahara di Express

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
