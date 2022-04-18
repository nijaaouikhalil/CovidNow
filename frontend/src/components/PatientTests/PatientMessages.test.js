import { render, screen } from "@testing-library/react";
import { PatientMessages } from "../Patient/PatientMessages";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store.js";

describe("Patients messages", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PatientMessages />
        </MemoryRouter>
      </Provider>
    );
  });
  it("renders warning message when there are no messages for patient", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PatientMessages />
        </MemoryRouter>
      </Provider>
    );
    const message = screen.getAllByText("No messages yet");
    expect(message).not.toBeNull();
  });
});
