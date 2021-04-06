const assert = require('assert')
const api = require('../api')
let app = {}


describe('Api Weather tests', function() {

    this.beforeAll(async () => {
        console.log(api)
        app = await api
    })


    it('Get Condition',async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/condition'
        })

        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepStrictEqual(statusCode,200)
        assert.deepStrictEqual(data.condition,'clear')
        
    });
    
});