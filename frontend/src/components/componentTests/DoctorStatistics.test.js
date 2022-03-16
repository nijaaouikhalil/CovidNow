import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_DoctorStatistics from '../../screens/componentTestScreens/CTestScreen_DoctorStatistics';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - doctors statistics", () => {
    render(
        <Provider store={store} >
            <CTestScreen_DoctorStatistics />
        </Provider>
    );
    // TO BE IMPLEMENTED
});