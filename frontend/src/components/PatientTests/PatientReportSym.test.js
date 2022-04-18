import { render, cleanup } from "@testing-library/react";
import { PatientReportSym } from "../Patient/PatientReportSym";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store.js";

describe("Patients report submitting form", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PatientReportSym />
        </MemoryRouter>
      </Provider>
    );
  });
});
