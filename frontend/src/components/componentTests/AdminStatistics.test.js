import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_AdminStatistics from '../../screens/componentTestScreens/CTestScreen_AdminStatistics';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - admin statistics", () => {
    render(
        <Provider store={store} >
            <CTestScreen_AdminStatistics />
        </Provider>
    );
    // TO BE IMPLEMENTED
});