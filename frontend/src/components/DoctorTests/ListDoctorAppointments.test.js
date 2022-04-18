import { render, cleanup } from "@testing-library/react";
import { ListDoctorsAppoinments } from "../../components/Doctor/ListDoctorAppointments";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store.js";

describe("Table displaying all a doctor's appointments", () => {
  afterEach(cleanup);
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ListDoctorsAppoinments patients={[]} />
        </MemoryRouter>
      </Provider>
    );
  });
});
