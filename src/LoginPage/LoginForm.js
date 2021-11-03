import Button from "./Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import { useHistory } from "react-router";

const dataLogin = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const history = useHistory();
  const [login, setLogin] = useState(dataLogin);
  const { email, password } = login;
  const [errors, setErrors] = useState("");

  const error = {
    valiemail: "",
    valipassword: "",
  };

  // input sate anageMent
  const loginOnChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginOnSubmit = async (e) => {
    e.preventDefault();
    let validatid = validationsLogin();
    setErrors(validatid);
    //URL of Login_API
    const url = `http://192.168.1.196:8090/api/user/login`;
    axios.post(url, login).then((response) => {
      console.log(`>>>>>>>>response.status>>>>>>>>>>>>>>>>`, response);
      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.token);
        history.push("/datatable");
      }
      const success = response.data.message;
      tostyfy(success);
    });
  };

  const tostyfy = (success) => {
    toast(success);
  };

  const validationsLogin = () => {
    // const regex = `""/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email"`;
    //Email Validation
    if (login.email === "") {
      error.valiemail = "Email is required";
    }
    //  else if (login.email === regex) {
    //   error.valiemail = "Plase Enter Valid email excpts !#$%^& ";
    // } else {
    //   error.valiemail = "";
    // }

    //Password Validation
    if (login.password === "") {
      error.valipassword = "Password is required";
    }
    // else if (login.password  > 6) {
    //   error.valipassword = " Password require > 5 Digit of number";
    // } else {
    //   error.valipassword = "Success full";
    // }
    setErrors(error);
    return error;
  };

  return (
    <div>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active"> Sign In </h2>
          <div className="fadeIn first"></div>
          <form onSubmit={loginOnSubmit}>
            <input
              onChange={loginOnChange}
              value={email}
              name="email"
              type="email"
              className="fadeIn second"
              placeholder="e-mail"
            />{" "}
            <br /> <span>{errors.valiemail}</span>
            <input
              onChange={loginOnChange}
              value={password}
              name="password"
              type="password"
              className="fadeIn third"
              placeholder="password"
            />
            <br /> <span>{errors.valipassword}</span> <br />
            <Button />
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

//export default LoginForm;
