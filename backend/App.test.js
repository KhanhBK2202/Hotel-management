// import 'react-native-gesture-handler/jestSetup';
const app = require('./index')

describe('POST /api/v1/user/login', () => {
    describe("given a email and password", () => {

      test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/api/v1/user/login").send({
          email: "email",
          password: "password"
        })
        expect(response.statusCode).toBe(200)
      })
      test("should specify json in the content type header", async () => {
        const response = await request(app).post("/api/v1/user/login").send({
          email: "email",
          password: "password"
        })
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
      })
      test("response has userId", async () => {
        const response = await request(app).post("/api/v1/user/login").send({
          email: "email",
          password: "password"
        })
        expect(response.body.userId).toBeDefined()
      })
    })

    describe("when the email and password is missing", () => {
      test("should respond with a status code of 400", async () => {
        const bodyData = [
          {email: "email"},
          {password: "password"},
          {}
        ]
        for (const body of bodyData) {
          const response = await request(app).post("/api/v1/user/login").send(body)
          expect(response.statusCode).toBe(404)
        }
      })
    })

});
