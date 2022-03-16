import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_HealthOfficialPatientsList from '../../screens/componentTestScreens/CTestScreen_HealthOfficialPatientsList';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - health official patients list", () => {
    render(
        <Provider store={store} >
            <CTestScreen_HealthOfficialPatientsList />
        </Provider>
    );
    // TO BE IMPLEMENTED
});