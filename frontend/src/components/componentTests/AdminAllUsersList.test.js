import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import '@testing-library/jest-dom'

import CTestScreen_AdminAllUsersList from '../../screens/componentTestScreens/CTestScreen_AdminAllUsersList';

import store from "../../store";
import { Provider } from "react-redux";

test("ctest - admin all users list", () => {
    render(
        <Provider store={store} >
            <CTestScreen_AdminAllUsersList />
        </Provider>
    );

    const tableHead = screen.getByTitle("adminUserListHead");
    expect(tableHead).toBeInTheDocument();
});