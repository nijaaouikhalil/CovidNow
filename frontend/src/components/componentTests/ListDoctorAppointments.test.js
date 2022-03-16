import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_ListDoctorAppointments from '../../screens/componentTestScreens/CTestScreen_ListDoctorAppointments';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - list doctor appointments", () => {
    render(
        <Provider store={store} >
            <CTestScreen_ListDoctorAppointments />
        </Provider>
    );
    // TO BE IMPLEMENTED
});