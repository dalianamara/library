import App from "../../../App";
import {
  fireEvent,
  queryByAttribute,
  render,
  screen,
} from "@testing-library/react";
import Login from "../../pages/Login";
const getById = queryByAttribute.bind(null, "id");

const renderLoginPage = (container) => {
  const loginPage = screen.getByText("LOGIN");
  fireEvent.click(loginPage);
};
describe("Login tests", () => {
  test("Given any input the login loads", () => {
    const { container } = render(<Login />, { wrapper: App });
    renderLoginPage(container);
  });

  test("Given an invalid username and password then it will return an error", () => {
    const { container } = render(<Login />, { wrapper: App });
    renderLoginPage(container);
    const username = screen.getByTestId("username");
    fireEvent.input(username, { target: { value: "alina" } });
    const password = screen.getByTestId("password");
    fireEvent.input(password, { target: { value: "alina" } });
    const loginButton = screen.getAllByText("Login");
    fireEvent.click(loginButton[1]);
    const error = screen.getByTestId("error");
    expect(error.textContent).toBe("invalid username");
  });
});
