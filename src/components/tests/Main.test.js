import Main from "../Main";
import App from "../../App";
import { render } from "@testing-library/react";

describe("Main Page tests", () => {
  test("Given any input the main page loads", () => {
    const { container } = render(
      <App>
        <Main></Main>
      </App>
    );
    expect(container).toBeTruthy();
  });
});
