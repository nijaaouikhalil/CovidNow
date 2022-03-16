import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_PatientStatistics from '../../screens/componentTestScreens/CTestScreen_PatientStatistics';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - patient statistics", () => {
    render(
        <Provider store={store} >
            <CTestScreen_PatientStatistics />
        </Provider>
    );
    // TO BE IMPLEMENTED
});