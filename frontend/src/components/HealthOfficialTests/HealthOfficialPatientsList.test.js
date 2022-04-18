import { render, cleanup } from "@testing-library/react";
import { HealthOfficialPatientsList } from "../../components/HealthOfficial/HealthOfficialPatientsList";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Table displaying all a health official's patients", () => {
  afterEach(cleanup);
  it("renders without crashing", () => {
    render(<HealthOfficialPatientsList all_users={[]} />);
  });

  it("renders empty table when passed empty array", () => {
    const { queryByTestId } = render(
      <HealthOfficialPatientsList all_users={[]} />
    );
    const tableBody = queryByTestId("hoff-all-users-table-body");
    expect(tableBody).toBeNull();
  });

  it("renders rows in table when passed array of users", () => {
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
    const { queryByTestId } = render(
      <MemoryRouter>
        <HealthOfficialPatientsList all_users={all_users} />
      </MemoryRouter>
    );
    const tableBody = queryByTestId("hoff-all-users-table-body");
    const tableRow = queryByTestId("hoff-all-users-table-row");
    expect(tableBody).toContainElement(tableRow);
  });
});
