const express = require('express');
const expressLayout = require('express-ejs-layouts');
const app = express();

//EJS 사용가능케 하기, EJS 홈페이지에서 사용법 확인
app.use(expressLayout);
app.set('view engine', 'ejs');


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));