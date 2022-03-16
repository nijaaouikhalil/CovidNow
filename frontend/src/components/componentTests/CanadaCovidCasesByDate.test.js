import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_CanadaCovidCasesByDateRangeLineGraph from '../../screens/componentTestScreens/CTestScreen_CanadaCovidCasesByDateRangeLineGraph';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - covid cases by date range", () => {
    render(
        <Provider store={store} >
            <CTestScreen_CanadaCovidCasesByDateRangeLineGraph />
        </Provider>
    );
    // TO BE IMPLEMENTED
});