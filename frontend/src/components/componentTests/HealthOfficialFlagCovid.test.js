import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_HealthOfficialFlagCovid from '../../screens/componentTestScreens/CTestScreen_HealthOfficialFlagCovid';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - health official flag covid", () => {
    render(
        <Provider store={store} >
            <CTestScreen_HealthOfficialFlagCovid />
        </Provider>
    );
    // TO BE IMPLEMENTED
});