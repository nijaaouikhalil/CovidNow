import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

//import App from '../../App';
import CTestScreen_Govern_ID from '../../screens/componentTestScreens/CTestScreen_Govern_ID';

import store from "../../store";
import { Provider } from "react-redux";

test("government ID test", () => {
    render(
        <Provider store={store} >
            <CTestScreen_Govern_ID />
        </Provider>
    );

    const textbox = screen.getByPlaceholderText("Gouverment ID");
    const button = screen.getByTitle("updatebutton7");
    expect(textbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    textbox.textContent = "12$45$78$90";
    var txtContentEqual = textbox.textContent === "12$45$78$90";
    expect(txtContentEqual).toBe(true);

});