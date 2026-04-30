const request = require("supertest");
const app = require("../server.js").default;

// 🔥 Mock DB
jest.mock("../database.js", () => ({
  initDb: jest.fn(),
  insertSubmission: jest.fn(() => 1),
  getAllSubmissions: jest.fn(() => [])
}));

// 🔥 Mock OpenAI
jest.mock("../classifier.js", () => ({
  classifyMessage: async () => "Sales"
}));

describe("POST /api/submit", () => {

  test("debería crear un lead correctamente", async () => {
    const res = await request(app)
      .post("/api/submit")
      .send({
        name: "Juan",
        email: "juan@test.com",
        message: "Quiero comprar"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("classification", "Sales");
  });

  test("debería fallar si faltan datos", async () => {
    const res = await request(app)
      .post("/api/submit")
      .send({
        name: "Juan"
      });

    expect(res.statusCode).toBe(400);
  });

});