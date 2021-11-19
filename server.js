const express = require('express');
const path = require('path');
const port = process.env.PORT || 7342;

const app = express();

app.use(express.urlencoded({extended: true}))

app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});