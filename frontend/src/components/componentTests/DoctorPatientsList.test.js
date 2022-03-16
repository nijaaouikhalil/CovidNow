import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_DoctorPatientsList from '../../screens/componentTestScreens/CTestScreen_DoctorPatientsList';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - doctor messages", () => {
    render(
        <Provider store={store} >
            <CTestScreen_DoctorPatientsList />
        </Provider>
    );
    // TO BE IMPLEMENTED
});