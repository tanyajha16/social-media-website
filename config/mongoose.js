const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codial_development');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"error connecting to mongodb"));

db.once('open',function()
{
    console.log("connected to database::MongoDB")
});
module.exports=db;