import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_DoctorsPieChart from '../../screens/componentTestScreens/CTestScreen_DoctorsPieChart';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - doctors pie chart", () => {
    render(
        <Provider store={store} >
            <CTestScreen_DoctorsPieChart />
        </Provider>
    );
    // TO BE IMPLEMENTED
});