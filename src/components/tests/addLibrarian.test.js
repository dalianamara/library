import addLibrarian from "../functions/addLibrarian";
describe("AddLibrarian tests", () => {
  test("Given any input the feedback is added in database", async () => {
    const model = {
      first: "alina",
      email: "alinamaria@yahoo.com",
      last: "maria",
      username: "alinamaria",
      password: "alinamaria1",
      phoneNumber: "076452718",
      user: "librarian",
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(model),
      })
    );
    await addLibrarian(model);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
