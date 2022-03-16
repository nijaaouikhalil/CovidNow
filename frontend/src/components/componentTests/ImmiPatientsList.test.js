import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_ImmiPatientsList from '../../screens/componentTestScreens/CTestScreen_ImmiPatientsLists';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - immi patients lists", () => {
    render(
        <Provider store={store} >
            <CTestScreen_ImmiPatientsList />
        </Provider>
    );
    // TO BE IMPLEMENTED
});