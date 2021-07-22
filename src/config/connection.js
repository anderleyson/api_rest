const mongoose = require('mongoose');

class Connection{

    constructor(){
        this.databaseConnectionMongo();
    }
    databaseConnectionMongo(){
        this.mongoConnection = mongoose.connect("mongodb://localhost/challenge",{
            useNewUrlParser: true,
            useUnifiedTopology: true, 
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() =>{

            console.log("Conexão estabelecida com MongoDB")

        }).catch((error)=>{
            
            console.log(`Erro ao estabelecer conexão com MongoDB ${error}`);

        });
    }

}

module.exports = new Connection();