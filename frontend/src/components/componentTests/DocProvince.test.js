import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

//import App from '../../App';
import CTestScreen_Doctor_Province from '../../screens/componentTestScreens/CTestScreen_Doctor_Province';

import store from "../../store";
import { Provider } from "react-redux";

test("doctor province test", () => {
    render(
        <Provider store={store} >
            <CTestScreen_Doctor_Province />
        </Provider>
    );

    const textbox = screen.getByPlaceholderText("Province");
    const button = screen.getByTitle("updatebutton6");
    expect(textbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    textbox.textContent = "ON";
    var txtContentEqual = textbox.textContent === "ON";
    expect(txtContentEqual).toBe(true);

});