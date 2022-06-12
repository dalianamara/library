import App from "../../../App";
import {
  fireEvent,
  queryByAttribute,
  render,
  screen,
} from "@testing-library/react";
import SignUp from "../../pages/SignUp";
const getById = queryByAttribute.bind(null, "id");
const renderLoginPage = (container) => {
  const loginPage = screen.getByText("LOGIN");
  fireEvent.click(loginPage);
  const signUpButton = screen.getByText("Don't have an account?");
  fireEvent.click(signUpButton);
};
describe("Login tests", () => {
  test("Given any input the login loads", () => {
    const { container } = render(<SignUp />, { wrapper: App });
    renderLoginPage(container);
  });

  //   test("Given an invalid username and password then it will return an error", () => {
  //     const { container } = render(<Login />, { wrapper: App });
  //     renderLoginPage(container);
  //     const username = screen.getByTestId("username");
  //     fireEvent.input(username, { target: { value: "alina" } });
  //     const password = screen.getByTestId("password");
  //     fireEvent.input(password, { target: { value: "alina" } });
  //     const loginButton = screen.getAllByText("Login");
  //     fireEvent.click(loginButton[1]);
  //     const error = screen.getByTestId("error");
  //     expect(error.textContent).toBe("invalid username");
  //   });
});
