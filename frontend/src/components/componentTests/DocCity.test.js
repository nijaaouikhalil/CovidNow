import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import App from '../../App';
import CTestScreen_Doctor_City from '../../screens/componentTestScreens/CTestScreen_Doctor_City';

import store from "../../store";
import { Provider } from "react-redux";

test("doctor city test", () => {
    render(
        <Provider store={store} >
            <CTestScreen_Doctor_City />
        </Provider>
    );

    const textbox = screen.getByPlaceholderText("City");
    const button = screen.getByTitle("updatebutton3");
    expect(textbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    textbox.textContent = "Montreal";
    var txtContentEqual = textbox.textContent === "Montreal";
    expect(txtContentEqual).toBe(true);

});