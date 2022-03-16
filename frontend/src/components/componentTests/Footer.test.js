import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_Footer from '../../screens/componentTestScreens/CTestScreen_Footer';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - footer", () => {
    render(
        <Provider store={store} >
            <CTestScreen_Footer />
        </Provider>
    );
    // TO BE IMPLEMENTED
});