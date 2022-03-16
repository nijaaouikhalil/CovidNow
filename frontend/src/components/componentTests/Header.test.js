import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_Header from '../../screens/componentTestScreens/CTestScreen_Header';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - header", () => {
    render(
        <Provider store={store} >
            <CTestScreen_Header />
        </Provider>
    );
    // TO BE IMPLEMENTED
});