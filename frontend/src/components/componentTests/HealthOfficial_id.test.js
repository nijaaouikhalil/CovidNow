import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import App from '../../App';
import CTestScreen_Health_ID from '../../screens/componentTestScreens/CTestScreen_Health_ID';

import store from "../../store";
import { Provider } from "react-redux";

test("health official ID test", () => {
    render(
        <Provider store={store} >
            <CTestScreen_Health_ID />
        </Provider>
    );

    const textbox = screen.getByPlaceholderText("Health Official ID");
    const button = screen.getByTitle("updatebutton8");
    expect(textbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    textbox.textContent = "1234";
    var txtContentEqual = textbox.textContent === "1234";
    expect(txtContentEqual).toBe(true);

});