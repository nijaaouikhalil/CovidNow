import { render, screen } from '@testing-library/react';
import App from './App';
import { login, register, logout } from "./actions/userActions";
import { useDispatch, useSelector } from "react-redux";

// integration test #1 - logging in
test("login", () => {

  let email = "officialcovidnow@gmail.com";
  let password = "covidNow123";

  (() => {
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, user_info } = userLogin;
    const dispatch = useDispatch();
    dispatch(login(email, password));
    console.log("done1");
    expect(user_info).toBe(!null);
  });
});

// integration test #2 - registering
test("register", () => {
  let name = "George";
  let lastName = "Koutsaris";
  let email = "georgekoutsaris@hotmail.com";
  let password = "random_pwd";
  let confirmPassword = password;
  let role = "user";
  (() => {
    const dispatch = useDispatch();
    dispatch(register({ name, lastName, email, password, confirmPassword, role }));
  });

});

// integration test #3 - logging out
test("logout", () => {
  let email = "officialcovidnow@gmail.com";
  let password = "covidNow123";

  (() => {
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, user_info } = userLogin;
    const dispatch = useDispatch();

    dispatch(login(email, password));
    expect(user_info).toBe(!null);
    dispatch(logout());
    expect(user_info).toBe(null);
  });
});