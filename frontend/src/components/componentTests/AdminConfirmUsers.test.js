import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_AdminConfirmUsers from '../../screens/componentTestScreens/CTestScreen_AdminConfirmUsers';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - admin confirm users", () => {
    render(
        <Provider store={store} >
            <CTestScreen_AdminConfirmUsers />
        </Provider>
    );
    // TO BE IMPLEMENTED
});