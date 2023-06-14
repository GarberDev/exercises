process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const items = require("../fakeDb");

let popsicle = { name: "popsicle", price: 1.45 };

beforeEach(function () {
  items.push(popsicle);
});

afterEach(function () {
  // empty out our fake db
  items.length = 0;
});

// GET /items

describe("GET /items", function () {
  test("Gets a list of items", async function () {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([popsicle]);
  });
});

// POST /items

describe("POST /items", function () {
  test("Creates a new item", async function () {
    const resp = await request(app)
      .post(`/items`)
      .send({ name: "cheerios", price: 3.4 });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ added: { name: "cheerios", price: 3.4 } });
  });
});

// GET /items/:name

describe("GET /items/:name", function () {
  test("Gets a single item", async function () {
    const resp = await request(app).get(`/items/${popsicle.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(popsicle);
  });
});

// PATCH /items/:name

describe("PATCH /items/:name", function () {
  test("Updates a single item", async function () {
    const resp = await request(app)
      .patch(`/items/${popsicle.name}`)
      .send({ name: "new popsicle", price: 2.45 });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      updated: { name: "new popsicle", price: 2.45 },
    });
  });
});

// DELETE /items/:name

describe("DELETE /items/:name", function () {
  test("Deletes a single a item", async function () {
    const resp = await request(app).delete(`/items/${popsicle.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});
