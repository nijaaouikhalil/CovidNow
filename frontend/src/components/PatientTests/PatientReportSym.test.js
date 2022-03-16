import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_PatientReportSym from '../../screens/componentTestScreens/CTestScreen_PatientReportSym';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - patient report sym", () => {
    render(
        <Provider store={store} >
            <CTestScreen_PatientReportSym />
        </Provider>
    );
    // TO BE IMPLEMENTED
});