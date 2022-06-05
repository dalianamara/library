import Main from "../Main";
import App from "../../App";
import { fireEvent, queryByAttribute, render, screen } from "@testing-library/react";

describe("Login page tests", () => {
  test("Given any input the login page loads", async () => {
    const { container } = render(
      <App>
        <Main />
      </App>
    );
    const loginButton = screen.getByText("LOGIN");
    fireEvent.click(loginButton);
    const getById = queryByAttribute.bind(null, "id");
    const username = getById(container, "username");
    const passoword = getById(container, "password");
    const submitButton = getById(container, "submit");
    fireEvent.change(username, {target: { value: "ss"}});
    fireEvent.change(passoword, {target: { value: "ss"}});
    fireEvent.click(submitButton)
    expect(container).toMatchSnapshot() ;
  });
});
