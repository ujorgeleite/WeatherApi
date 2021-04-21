const assert = require("assert");

const api = require("../api");

describe("Authentication Tests", function() {
  let app = {};

  this.beforeAll(async () => {
      app = await api

  });

  this.afterAll(() =>{
      app.stop()
  })

  it("Test authentication sucess", async() => {
    const result = await app.inject({
        method:"POST",
        url: "/authentication/george/1234aashdbasjhb"
    })

    const { status, token } = JSON.parse(result.payload);
    assert.deepStrictEqual(
      status,
      200,
      "The return for call is different that expected."
    );
    assert.deepStrictEqual(
      token.length > 10,
      true,
      "The size of token return not is correct."
    );
  });

  // it('Test authentication failure', () => {
  //     assert.deepStrictEqual(status,500, 'The return for call is different that expected.')
  //     assert.throws(() => )
  // });
});
