import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_CreateNewAppointment from '../../screens/componentTestScreens/CTestScreen_CreateNewAppointment';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - create new appointment", () => {
    render(
        <Provider store={store} >
            <CTestScreen_CreateNewAppointment />
        </Provider>
    );
    // TO BE IMPLEMENTED
});