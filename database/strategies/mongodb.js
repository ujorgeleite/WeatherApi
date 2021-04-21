const Mongoose = require("mongoose");

const ICrud = require("../base/iCrud");
const STATUS = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnected",
};

class MongoDb extends ICrud {
    constructor(params) {
        super();
        const { database, user, pwd, url, aliasConnection } = params;
        
        this._users = null;
        this._driver = null;
        this.mongodbUrl = `${aliasConnection}${user}:${pwd}@${url}/${database}`
        
    }
    
    close() {
        this._driver.close();
    }
    
    async isConnected() {
        const state = STATUS[this._driver.readyState];
        
        if (state === "Connected") return state;
        
        if (state !== "Connecting") return state;
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return STATUS[this._driver.readyState];
    }
    
    defineModel() {
        const userSchema = new Mongoose.Schema({
            name: {
                type: String,
                required: true,
            },
            pwd: {
                type: String,
                required: true,
            },
            insertedAt: {
                type: Date,
                default: new Date(),
            },
        });
        
        this._users = Mongoose.models.users || Mongoose.model("users", userSchema);
    }
    
    connect() {
        Mongoose.connect(
            this.mongodbUrl,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            error => {
                if (!error) return;
                console.log("Connection failure!!", error);
            }
            );
            
            const connection = Mongoose.connection;
            connection.once("open", () => console.log("database is running!!"));
            this._driver = connection;
            this.defineModel();
        }
        
        create(item) {
            return this._users.create(item);
        }
        
        read(item = {}) {
            return this._users.find(item, { name: 1, pwd: 1, insertedAt: 1 });
        }
        
        update(id, item) {
            return this._users.updateOne({ _id: id }, { $set: item });
        }
        
        delete(id) {
            return this._users.deleteOne({ _id: id });
        }
    }
    
    module.exports = MongoDb;
    