// Reference https://fek.io/blog/how-to-add-unit-testing-to-express-using-jest

import express from 'express';
import apiErrorHandler from '../../utils/apiErrorHandler';
import UserValidatorRequest from '../userValidatorRequest';
import bodyParser from 'body-parser';
import supertest from 'supertest'

function index(req, res) {
  res.send("Success")
  return;
}

const validator = new UserValidatorRequest()

const app = new express()
app.use(bodyParser.json());
app.get("/", index)
app.post("/", validator.validateUserLogin, index, apiErrorHandler)

const request = supertest(app)


describe("Login Endpoints", () => {
  test("Test Endpoint", async () => {
    const res = await request.get("/").expect(200)
    expect(res.status).toEqual(200)
  })

  test("Pengecekan ketika gagal mendapatkan email dengan password ada", async () => {
    const res = await request.post("/").send({
      email: "",
      password: "aslkdjalsjdas"
    })
    expect(res.status).toEqual(400)
  })

  test("Pengecekan ketika gagal mendapatkan password dengan email ada", async () => {
    const res = await request.post("/").send({
      email: "asdasdasd",
      password: ""
    })
    expect(res.status).toEqual(400)
  })

  test("Pengecekan gagal ketika tidak ada password dan email.", async () => {
    const res = await request.post("/").send({
      email: "",
      password: ""
    })
    expect(res.status).toEqual(400)
  })

  test("Pengecekan ketika gagal melakukan validasi strong password dengan validasi email salah.", async () => {
    const res = await request.post("/").send({
      email: "kaenovagmail.com",
      password: ".Kona123456"
    })
    expect(res.status).toEqual(400)
  })

  test("Pengecekan ketika gagal melakukan validasi email dengan tidak strong password", async () => {
    const res = await request.post("/").send({
      email: "kaenova@gmail.com",
      password: "lkasjldajlsd"
    })
    expect(res.status).toEqual(400)
  })

  test("Pengecekan ketika sukses", async ()=> {
    const res = await request.post("/").send({
      email: "kae@gmail.com",
      password: ".Kaenova123"
    })
    expect(res.status).toEqual(200)
  })
})


