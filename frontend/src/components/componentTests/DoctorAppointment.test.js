import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_DoctorAppointment from '../../screens/componentTestScreens/CTestScreen_DoctorAppointment';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - doctor appointment", () => {
    render(
        <Provider store={store} >
            <CTestScreen_DoctorAppointment />
        </Provider>
    );
    // TO BE IMPLEMENTED
});