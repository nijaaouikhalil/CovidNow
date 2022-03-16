import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_PatientContactTracing from '../../screens/componentTestScreens/CTestScreen_PatientContactTracing';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - patient contact tracing", () => {
    render(
        <Provider store={store} >
            <CTestScreen_PatientContactTracing />
        </Provider>
    );
    // TO BE IMPLEMENTED
});