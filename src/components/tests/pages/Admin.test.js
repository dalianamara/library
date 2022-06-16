import App from "../../../App";
import { fireEvent, render, act, screen } from "@testing-library/react";
import Login from "../../pages/Login";
const mockObject = {
  _id: "62a0b09284810d7da2ddaa8d",
  email: "admin@yahoo.com",
  password: "$2a$10$HElheEhi1yH33imDpM8sjerN7Z07bcA/dpTPsgEU6MrVi9yrE/Bi6",
  user: "admin",
  username: "admin",
};
const mockGenre = [
  {
    _id: "62a23b4deb79cdfde55fd0b7",
    name: "Programming",
  },
  {
    _id: "62a23cd0eb79cdfde55fd0b9",
    name: "Children",
  },
  {
    _id: "62a23d46eb79cdfde55fd0ba",
    name: "Romance",
  },
];

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
    user: "librarian",
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

  {
    _id: "62a0b09284810d7da2ddaa8d",
    first: "admin",
    last: "admin",
    email: "admin@yahoo.com",
    username: "admin",
    password: "$2a$10$HElheEhi1yH33imDpM8sjerN7Z07bcA/dpTPsgEU6MrVi9yrE/Bi6",
    user: "admin",
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
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockGenre),
      })
    );
});
afterEach(() => {
  global.fetch.mockClear();
  jest.clearAllMocks();
});

describe("Login admin tests", () => {
  test("Given invalid username then it returns an error", async () => {
    await act(async () => {
      render(<Login />, { wrapper: App });
    });
    const loginPage = screen.getByText("LOGIN");
    fireEvent.click(loginPage);
    const username = await screen.findByTestId("username");
    fireEvent.change(username, { target: { value: "admins" } });
    const password = await screen.findByTestId("password");
    fireEvent.change(password, { target: { value: "adminpassword" } });
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
    fireEvent.change(username, { target: { value: "admin" } });
    const password = await screen.findByTestId("password");
    fireEvent.change(password, { target: { value: "adminpasswords" } });
    const loginButton = await screen.findByTestId("loginButton");
    fireEvent.submit(loginButton);
    const error = screen.getByTestId("error");
    expect(error.textContent).toBe("Sorry, your password is inccorect.");
  });
  test("Given valid username and password then the librarian logins in application", async () => {
    await act(async () => {
      render(<Login />, { wrapper: App });
    });
    const loginPage = screen.getByText("LOGIN");
    fireEvent.click(loginPage);
    const username = await screen.findByTestId("username");
    fireEvent.change(username, { target: { value: "admin" } });
    const password = await screen.findByTestId("password");
    fireEvent.change(password, { target: { value: "adminpassword" } });
    const loginButton = await screen.findByTestId("loginButton");
    await act(async () => {
      fireEvent.submit(loginButton);
    });
    const addLibrarianButton = screen.getByText("ADD LIBRARIAN");
    const logoutButton = screen.getByText("LOGOUT");
    expect(addLibrarianButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
});

describe("Menu buttons tests", () => {
  test("Given valid input for add librarian form fields then value fields are returned", async () => {
    jest.spyOn(global, "fetch").mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockGenre),
      })
    );
    await act(async () => {
      render(<Login />, { wrapper: App });
    });
    const usersButton = screen.getByText("LIBRARIANS");
    await act(async () => {
      fireEvent.mouseOver(usersButton);
      const addUsersButton = screen.getByText("ADD LIBRARIAN");
      fireEvent.click(addUsersButton);
    });

    const firstname = await screen.findByTestId("firstname");
    fireEvent.change(firstname, { target: { value: "Alina" } });
    const lastname = await screen.findByTestId("lastname");
    fireEvent.change(lastname, { target: { value: "Popescu" } });
    const email = await screen.findByTestId("email");
    fireEvent.change(email, {
      target: { value: "alinapopescu@@librarianmanagement.ro" },
    });
    const phoneNumber = await screen.findByTestId("phoneNumber");
    fireEvent.change(phoneNumber, { target: { value: "0765342132" } });
    const username = await screen.findByTestId("username");
    fireEvent.change(username, { target: { value: "alinapopescu" } });
    expect(firstname.value).toBe("Alina");
    expect(lastname.value).toBe("Popescu");
    expect(phoneNumber.value).toBe("0765342132");
    expect(username.value).toBe("alinapopescu");
    expect(email.value).toBe("alinapopescu@@librarianmanagement.ro");
  });

  test("Given any input then the librarians table loads", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockUsers),
      })
    );
    await act(async () => {
      render(<Login />, { wrapper: App });
    });
    const usersButton = screen.getByText("LIBRARIANS");
    await act(async () => {
      fireEvent.mouseOver(usersButton);
      const viewUsersButton = screen.getByText("VIEW LIBRARIANS");
      fireEvent.click(viewUsersButton);
    });
    const existentUser = screen.getByText("Lucian");
    expect(existentUser).toBeInTheDocument();
  });

  //   test("Given any input then the reviews table loads", async () => {
  //     jest.spyOn(global, "fetch").mockImplementation(() =>
  //       Promise.resolve({
  //         status: 200,
  //         json: () => Promise.resolve(mockReviews),
  //       })
  //     );
  //     await act(async () => {
  //       render(<Login />, { wrapper: App });
  //     });
  //     const reviewsButton = screen.getByText("VIEW REVIEWS");
  //     fireEvent.click(reviewsButton);

  //     const existentUser = screen.getByText("Lucian");
  //     expect(existentUser).toBeInTheDocument();
  //   });
});
