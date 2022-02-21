import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import App from '../../App';
import CTestScreen_Doctor_PostalCode from '../../screens/componentTestScreens/CTestScreen_Doctor_PostalCode';

import store from "../../store";
import { Provider } from "react-redux";

test("doctor postal code test", () => {
    render(
        <Provider store={store} >
            <CTestScreen_Doctor_PostalCode />
        </Provider>
    );

    const textbox = screen.getByPlaceholderText("Postal Code");
    const button = screen.getByTitle("updatebutton4");
    expect(textbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    textbox.textContent = "12345";
    var txtContentEqual = textbox.textContent === "12345";
    expect(txtContentEqual).toBe(true);

});