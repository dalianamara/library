import App from "../../../App";
import {
  fireEvent,
  queryByAttribute,
  render,
  screen,
} from "@testing-library/react";
import Login from "../../pages/Login";
import ViewBooksAsUser from "../../pages/ViewBooksAsUser";
import fetchMock from "fetch-mock";
const app = require("express");
let request = require("supertest");

const getById = queryByAttribute.bind(null, "id");

beforeAll = async () => {
  fetchMock.mock("http://localhost:5000/book/", 200);
  await fetch(`http://localhost:5000/book/`);
};

const renderViewBooksPage = (container) => {
  const ViewBooksPage = screen.getByText("MY LIBRARY");
  fireEvent.click(ViewBooksPage);
};

describe("ViewBooks tests", () => {
  test("Given any input the ViewBooks loads", () => {
    const { container } = render(<ViewBooksAsUser />, { wrapper: App });
    renderViewBooksPage(container);
  });

  request = request("http://localhost:5000");
  test("Test /book route", async () => {
    let books;
    const result = request
      .get("/book")
      .expect(200)
      .then((response) => {
        books = response.body.json();
        console.log(response.body);
      });
  });

  test("Test /record route", async () => {});

  // test("Given an invalid username and password then it will return an error", () => {
  //   const { container } = render(<Login />, { wrapper: App });
  //   renderLoginPage(container);
  //   const username = screen.getByTestId("username");
  //   fireEvent.input(username, { target: { value: "alina" } });
  //   const password = screen.getByTestId("password");
  //   fireEvent.input(password, { target: { value: "alina" } });
  //   const loginButton = screen.getAllByText("Login");
  //   fireEvent.click(loginButton[1]);
  //   const error = screen.getByTestId("error");
  //   expect(error.textContent).toBe("invalid username");
  // });
});
