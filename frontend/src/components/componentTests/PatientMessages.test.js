import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_PatientMessages from '../../screens/componentTestScreens/CTestScreen_PatientMessages';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - patient messages", () => {
    render(
        <Provider store={store} >
            <CTestScreen_PatientMessages />
        </Provider>
    );
    // TO BE IMPLEMENTED
});