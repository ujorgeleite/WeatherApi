require("dotenv/config");
const assert = require('assert')
const Mongodb = require('../database/strategies/mongodb')
const Context = require('../database/contextStrategy');
const MOCK_USER = {
    name: 'George',
    pwd: '123456'
};

const params = {
    database: process.env.MONGODB_DATABASE_DATABASE,
    user:process.env.MONGODB_DATABASE_USER,
    pwd:process.env.MONGODB_DATABASE_PWD,
    url:process.env.MONGODB_DATABASE_URL,
    aliasConnection:process.env.MONGODB_DATABASE_ALIAS_CONNECTION
}

const context = new Context(new Mongodb(params))
let USER_MOCK_ID=''
describe('Mongodb tests', function() {
    
    this.beforeAll(async () => {
        await context.connect()
        const result = await context.create(MOCK_USER)
        USER_MOCK_ID = result.id
        
    })
    
    this.afterAll(async () => {
        context.close()
    })
    
    it('verify connection', async () => {
        const result = await context.isConnected()
        const expected = 'Connected'
        assert.deepStrictEqual(result,expected, "The Mongodb is not connected")
    });
    
    it('create', async () => {
        const { name, pwd, id  } = await context.create(MOCK_USER)
        await context.delete(id)
        assert.deepStrictEqual({name, pwd}, MOCK_USER)
    });
    
    it('list', async () => {
        const [{name,pwd}] = await context.read({name: MOCK_USER.name})
        assert.deepStrictEqual({name, pwd}, MOCK_USER) 
    });
    
    it('update', async() => {
        const result = await context.update(USER_MOCK_ID, {name: 'eduard'})
        assert.deepStrictEqual(result.nModified,1)
    });
    
    it('delete', async () => {
        const result = await context.delete(USER_MOCK_ID)
        assert.deepStrictEqual(result.n,1)   
    });
    
});