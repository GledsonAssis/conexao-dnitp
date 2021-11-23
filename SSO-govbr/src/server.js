const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 7003

dotenv.config()

app.use(helmet());
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

require('./Routes/index')(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
