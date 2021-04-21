const ICrud = require('./base/iCrud')
class ContextStrategy extends ICrud{
    
    constructor(strategy){
        super()
        this._database = strategy 
    }
    
    create(item){
        return this._database.create(item)
    }
    
    read(query){
        return this._database.read(query)
    }
    
    update(id, item){
        return this._database.update(id,item)
    }
    
    delete(id){
        return this._database.delete(id)  
    }

    connect(){
        this._database.connect()
    }

    isConnected(){
        return this._database.isConnected()
    }

    close(){
        this._database.close()
    }
    
} 

module.exports = ContextStrategy