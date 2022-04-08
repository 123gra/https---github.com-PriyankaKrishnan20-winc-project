const mongoose = require('mongoose');

mongoose.connection.on('connect',() =>{
    console.log('Connected to the DB');
})

mongoose.connection.on('error',(err)=>{
    console.log('An error occurred while connecting to the DB',err)
})

try{
    mongoose.connect(process.env.MONGO_URI);
}catch(err){
    console.log(err);
}
