import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_HealthOfficialStatistics from '../../screens/componentTestScreens/CTestScreen_HealthOfficialStatistics';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - health official statistics", () => {
    render(
        <Provider store={store} >
            <CTestScreen_HealthOfficialStatistics />
        </Provider>
    );
    // TO BE IMPLEMENTED
});