import addFeedback from "../functions/addFeedback";

describe("AddFeedback tests", () => {
  test("Given any input the feedback is added in db", async () => {
    const model = {
      name: "alina",
      email: "alinamaria@yahoo.com",
      message: "good!",
    };
    const res = await addFeedback(model);
    console.log(res);
  });
});
