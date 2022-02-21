import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import App from '../../App';
import CTestScreen_Doctor_Address1 from '../../screens/componentTestScreens/CTestScreen_Doctor_Address1';

import store from "../../store";
import { Provider } from "react-redux";

test("doctor address 1 test", () => {
    render(
        <Provider store={store} >
            <CTestScreen_Doctor_Address1 />
        </Provider>
    );

    const textbox = screen.getByPlaceholderText("Address 1");
    const button = screen.getByTitle("updatebutton1");
    expect(textbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    textbox.textContent = "<civic 1> <street name 1> avenue";
    var txtContentEqual = textbox.textContent === "<civic 1> <street name 1> avenue";
    expect(txtContentEqual).toBe(true);

});