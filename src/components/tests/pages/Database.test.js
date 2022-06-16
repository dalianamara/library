import App from "../../../App";
import fetchMock from "fetch-mock";
import {
  fireEvent,
  queryByAttribute,
  render,
  act,
  screen,
} from "@testing-library/react";
import Login from "../../pages/Login";

const mockObject = {
  _id: "62a0a6d1ae3d08b41231965a",
  email: "luciangeo@gmail.com",
  password: "$2a$10$FlFuTDSh02.VF31.A4Lr/.y5w0BW/cvnC8XzWbrxeCu/FFZHcPJy.",
  user: "user",
  username: "luciangeo",
};

const mockUsers = [
  {
    _id: "62a0a6d1ae3d08b41231965a",
    first: "Lucian",
    last: "Mateescu",
    email: "luciangeo@gmail.com",
    username: "luciangeo",
    password: "$2a$10$FlFuTDSh02.VF31.A4Lr/.y5w0BW/cvnC8XzWbrxeCu/FFZHcPJy.",
    street: "Cozia",
    phoneNumber: "074812421",
    city: "Timisoara",
    user: "user",
  },

  {
    _id: "62a3b7649f95e432103cf200",
    first: "Alina",
    last: "Maria",
    email: "alinamaria@yahoo.com",
    username: "alinamaria",
    password: "$2a$10$4.qHjp2JEmZoPr5XZedFtekwr/KYRj40BeI/Coz/qNAj873ndW1VC",
    phoneNumber: "076452718",
    user: "user",
  },
];
beforeEach(() => {
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockObject),
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockUsers),
      })
    );
});
afterEach(() => {
  global.fetch.mockClear();
  jest.clearAllMocks();
});

describe("Login tests", () => {
  test("Given invalid username then it returns an error", async () => {
    await act(async () => {
      render(<Login />, { wrapper: App });
    });
    const loginPage = screen.getByText("LOGIN");
    fireEvent.click(loginPage);
    const username = await screen.findByTestId("username");
    fireEvent.change(username, { target: { value: "luciangeos" } });
    const password = await screen.findByTestId("password");
    fireEvent.change(password, { target: { value: "luciangeo" } });
    const loginButton = await screen.findByTestId("loginButton");
    fireEvent.submit(loginButton);
    const error = screen.getByTestId("error");
    expect(error.textContent).toBe("Sorry, your username is inccorect.");
  });

  test("Given invalid password then it returns an error", async () => {
    await act(async () => {
      render(<Login />, { wrapper: App });
    });
    const loginPage = screen.getByText("LOGIN");
    fireEvent.click(loginPage);
    const username = await screen.findByTestId("username");
    fireEvent.change(username, { target: { value: "luciangeo" } });
    const password = await screen.findByTestId("password");
    fireEvent.change(password, { target: { value: "luciangeos" } });
    const loginButton = await screen.findByTestId("loginButton");
    fireEvent.submit(loginButton);
    const error = screen.getByTestId("error");
    expect(error.textContent).toBe("Sorry, your password is inccorect.");
  });

  test("Given valid username and password then the user logins in application", async () => {
    await act(async () => {
      render(<Login />, { wrapper: App });
    });
    const loginPage = screen.getByText("LOGIN");
    fireEvent.click(loginPage);
    const username = await screen.findByTestId("username");
    fireEvent.change(username, { target: { value: "luciangeo" } });
    const password = await screen.findByTestId("password");
    fireEvent.change(password, { target: { value: "luciangeo" } });
    const loginButton = await screen.findByTestId("loginButton");
    await act(async () => {
      fireEvent.submit(loginButton);
    });
    const catalogueButton = screen.getByText("Catalogue");
    const logoutButton = screen.getByText("LOGOUT");
    expect(catalogueButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
});
