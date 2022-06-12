import addBooks from "../functions/addBooks";
import request from "supertest";
// jest.mock("../functions/addBooks");
describe("AddBook tests", () => {
  test("Given any input the book is added in database", async () => {
    const bookModel = {
      title: "a",
      author: "a",
      genre: "a",
      cover: "a",
      year: 0,
      description: "a",
      pages: 0,
      publisher: "a",
      stock: 0,
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(bookModel),
      })
    );
    const res = request("http://localhost:5000").get("/book");
    console.log(res);
    await addBooks(bookModel);
    const fetchMock = jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve(bookModel) })
      );

    expect(fetchMock).tobeca;
  });
});
