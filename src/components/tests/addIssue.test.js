import addIssue from "../functions/addIssue";

describe("AddIssue tests", () => {
  test("Given any input the issue is added in db", async () => {
    const model = {
      userId: "76523562347",
      first: "alina",
      last: "maria",
      email: "alinamaria@yahoo.com",
      phoneNumber: "0745123451",
      city: "Timisoara",
      street: "Cozia no. 176",
      bookId: "7834df74szd",
      bookTitle: `Once upon a time`,
      deliveryType: "pickup",
      isApproved: undefined,
      isReturned: undefined,
      returnApproval: undefined,
      fine: 0,
      issueDate: "03/03/2022",
      dueDate: "3/04/2022",
      isReserved: undefined,
      receipt: undefined,
    };
    const res = await addIssue(model);
    console.log(res);
  });
});
