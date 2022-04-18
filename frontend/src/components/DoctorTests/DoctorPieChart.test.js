import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store.js";
import { CasesByProvincePieChart } from "../Doctor/CasesByProvincePieChart";
import "jest-canvas-mock";
jest.mock("react-chartjs-2", () => ({ Pie: () => null }));

describe("Doctor Pie Chart sort users", () => {
  it("Renders component without issue", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CasesByProvincePieChart patients={[]} />
        </MemoryRouter>
      </Provider>
    );
  });
  it("Chart not displayed if no users passed", async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CasesByProvincePieChart patients={[]} />
        </MemoryRouter>
      </Provider>
    );
    expect(container.childElementCount).toEqual(0);
  });
  it("Chart displayed if users passed", async () => {
    let all_users = [
      {
        _id: "testId",
        name: "testName",
        lname: "testLName",
        email: "test@email",
        count: 29,
        roles: { name: "admin" },
        covidStatus: "negative",
        your_doctor: { name: "testDoctorName" },
      },
    ];
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CasesByProvincePieChart patients={all_users} />
        </MemoryRouter>
      </Provider>
    );
    const chart = screen.queryAllByTestId("doctor-pie-test");
    expect(chart).not.toBeNull();
  });
});
