import addReview from "../functions/addReview";

describe("AddReview tests", () => {
  test("Given any input the review is added in db", async () => {
    const model = {
      firstName: "alina",
      lastName: "maria",
      date: "03/03/2022",
      content: "must read",
      stars: 2,
    };
    const res = await addReview(model);
    console.log(res);
  });
});
