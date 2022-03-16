import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_Message from '../../screens/componentTestScreens/CTestScreen_Message';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - message", () => {
    render(
        <Provider store={store} >
            <CTestScreen_Message />
        </Provider>
    );
    // TO BE IMPLEMENTED
});