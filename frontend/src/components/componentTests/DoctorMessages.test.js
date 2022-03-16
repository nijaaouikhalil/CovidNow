import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_DoctorMessages from '../../screens/componentTestScreens/CTestScreen_DoctorMessages';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - doctor messages", () => {
    render(
        <Provider store={store} >
            <CTestScreen_DoctorMessages />
        </Provider>
    );
    // TO BE IMPLEMENTED
});