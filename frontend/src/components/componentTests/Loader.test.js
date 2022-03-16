import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_Loader from '../../screens/componentTestScreens/CTestScreen_Loader';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - loader", () => {
    render(
        <Provider store={store} >
            <CTestScreen_Loader />
        </Provider>
    );
    // TO BE IMPLEMENTED
});