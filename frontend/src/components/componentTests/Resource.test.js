import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_Resource from '../../screens/componentTestScreens/CTestScreen_Resource';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - resource", () => {
    render(
        <Provider store={store} >
            <CTestScreen_Resource />
        </Provider>
    );
    // TO BE IMPLEMENTED
});