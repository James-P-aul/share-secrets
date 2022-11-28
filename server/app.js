const express= require("express");
const app= express();
const auth = require('./Routes/Auth');
const note = require('./Routes/Note');
var cors = require('cors')
app.use(cors())


app.use(express.json());
app.use('/auth', auth);
app.use('/note', note);

app.listen(8000,()=>{
    console.log("litening at port 8000");
})