import React from "react";
import { render } from "@testing-library/react";
import { HealthOfficialFlagCovid } from "../HealthOfficial/HealthOfficialFlagCovid";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store.js";

describe("Health official covid flagging component", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HealthOfficialFlagCovid />
        </MemoryRouter>
      </Provider>
    );
  });
});
