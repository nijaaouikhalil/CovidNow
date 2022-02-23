import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import App from '../../App';
import CTestScreen_Doctor_Address2 from '../../screens/componentTestScreens/CTestScreen_Doctor_Address2';

import store from "../../store";
import { Provider } from "react-redux";

test("doctor address 2 test", () => {
    render(
        <Provider store={store} >
            <CTestScreen_Doctor_Address2 />
        </Provider>
    );

    const textbox = screen.getByPlaceholderText("Address 2");
    const button = screen.getByTitle("updatebutton2");
    expect(textbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    textbox.textContent = "<civic 2> <street name 2> avenue";
    var txtContentEqual = textbox.textContent === "<civic 2> <street name 2> avenue";
    expect(txtContentEqual).toBe(true);

});