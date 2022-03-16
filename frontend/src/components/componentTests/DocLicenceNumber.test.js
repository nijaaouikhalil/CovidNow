import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

//import App from '../../App';
import CTestScreen_Doctor_LicenceNum from '../../screens/componentTestScreens/CTestScreen_Doctor_LicenceNum';

import store from "../../store";
import { Provider } from "react-redux";

test("doctor licence number test", () => {
    render(
        <Provider store={store} >
            <CTestScreen_Doctor_LicenceNum />
        </Provider>
    );

    const textbox = screen.getByPlaceholderText("Licence Number");
    const button = screen.getByTitle("updatebutton5");
    expect(textbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    textbox.textContent = "123$$$789";
    var txtContentEqual = textbox.textContent === "123$$$789";
    expect(txtContentEqual).toBe(true);

});