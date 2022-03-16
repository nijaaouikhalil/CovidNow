import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_ImmiStatistics from '../../screens/componentTestScreens/CTestScreen_ImmiStatistics';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - immi statistics", () => {
    render(
        <Provider store={store} >
            <CTestScreen_ImmiStatistics />
        </Provider>
    );
    // TO BE IMPLEMENTED
});