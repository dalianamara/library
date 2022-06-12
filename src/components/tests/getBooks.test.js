import { getBooks, getBook } from "../functions/getBooks";
import fetchMock from "fetch-mock";
let request = require("supertest");
window.alert = jest.fn();

beforeAll = async () => {
  fetchMock.mock("http://localhost:5000/book/", 200);
  await fetch(`http://localhost:5000/book/`);
};
describe("getBook tests", () => {
  test("Given any input the books are retrieved from db", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(),
      })
    );
    await getBooks();
    let books;
    request = request("http://localhost:5000");
    const result = await request
      .get("/book")
      .expect(200)
      .then((response) => {
        books = response;
        return books;
      })
      .catch((error) => {
        console.log(error);
      });
    expect(result.text).not.toBe({});
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("Given any input the book is added in database", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(),
      })
    );
    await getBook("6213b4846388793e17961bcf");
    let books;
    const result = await request
      .get("/book/6213b4846388793e17961bcf")
      .expect(200)
      .then((response) => {
        books = response;
        return books;
      })
      .catch((error) => {
        console.log(error);
      });
    expect(result).not.toBe({});
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test("Given any input the book is added in database2", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(),
      })
    );
    await getBook("6213b4846388793e17961bdf");
    let books;
    const result = await request
      .get("/book/6213b4846388793e17961bcf")
      .expect(200)
      .then((response) => {
        books = response;
        return books;
      })
      .catch((error) => {
        console.log(error);
      });
    expect(result).not.toBe({});
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
