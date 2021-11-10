import React, { useState,useEffect } from "react";
import Nav from "./Nav";
import "./AddUser.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
//url res
  const send = useHistory();
  const loginStatus = () => {
    const item = localStorage.getItem("token");
    if (item === null) {
      send.push("/");
    }
  };

  useEffect(() => {
    loginStatus();
  }, []);
  const initialState = {
    name: "",
    username: "",
    gender: "",
    phone_number: "",
    email: "",
    password: "",
  };

  const [adduser, setaddUser] = useState(initialState);
  const { name, username, gender, phone_number, email, password } = adduser;

  const [error, setError] = useState("");
  let errors = {
    errname: "",
    errusername: "",
    errphone: "",
    erremail: "",
    errpassword: "",
  };

  const history = useHistory();
  const onChange = (e) => {
    userValidation()
    setaddUser({ ...adduser, [e.target.name]: e.target.value });
  };

  const apiRes = () => {
    if (adduser.name === "") {
      return false;
    }
    if (adduser.username === "") {
      return false;
    }
    if (adduser.phone_number === "") {
      return false;
    }
    if (adduser.email === "") {
      return false;
    }
    if (adduser.password === "") {
      return false;
    }

    return true;
  };

  //onSubmit With Api

  const onSubmit = (e) => {
    e.preventDefault();
    setaddUser({ ...adduser, [e.target.name]: e.target.value });
    console.log(adduser);
    let auth = userValidation();
    setError(auth);

    if (apiRes()) {
      const url = `http://192.168.1.196:8090/api/user/create-user`;
      axios
        .post(url, adduser, {
          headers: {
            "content-type": "application/json",
            accept: "application/json",
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(`>>>>>>>>>>>>>>>>>>>RESPONSE`, response.data.message);
          if (response.status !== 200) {
            erHandling(response.data.message);
          } else if (response.status === 200) {
            erHandling(response.data.message);
            setTimeout(() => {
              history.push("/datatable");
            }, 3000);
          }
        });
    }
  };

  const erHandling = (message) => {
    toast(message);
  };

  //Cancle Function
  const cancleUser = () => {
    history.push("/datatable");
  };

  const userValidation = () => {
    if (adduser.name === "") {
      errors.errname = "Name is required";
    }else {
      errors.errname = "";
    }

    if (adduser.username === "") {
      errors.errusername = "Username is required";
    }

    if (adduser.phone_number === "") {
      errors.errphone = "Phone number is required";
    }

    if (adduser.email === "") {
      errors.erremail = "Email is required";
    }
    if (adduser.password === "") {
      errors.errpassword = "password is required";
    }

    setError(errors);
    return errors;
  };

  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className="container">
        <div className="title">Add-User</div>
        <div className="content">
          <form onSubmit={onSubmit}>
            <div className="user-details">
              <div className="input-box">
                <label className="details">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={onChange}
                  name="name"
                />{" "}
                <span>{error.errname}</span>
              </div>
              <div className="input-box">
                <label className="details">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  name="username"
                  onChange={onChange}
                />
                <span>{error.errusername}</span>
              </div>
              <div className="input-box">
                <label className="details">Email</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={onChange}
                />{" "}
                <span>{error.erremail}</span>
              </div>
              <div className="input-box">
                <label className="details">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter your number"
                  name="phone_number"
                  value={phone_number}
                  onChange={onChange}
                />
                <span>{error.errphone}</span>
              </div>
              <div className="input-box">
                <label className="details">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />{" "}
                <span>{error.errpassword}</span>
              </div>
              <div className="gender-details">
                <label className="gender-title">Gender</label>

                <select
                  value={gender}
                  onChange={onChange}
                  name="gender"
                  id="Gender"
                >
                  <option name="gender" value="gender">
                    Gender
                  </option>
                  <option name="male" value="male">
                    male
                  </option>
                  <option name="feaml" value="female">
                    female
                  </option>
                  <option name="other " value="other">
                    other
                  </option>
                </select>
              </div>
              <div className="button">
                <input type="submit" value="Add User" />
              </div>
              <ToastContainer />
              <div className="button">
                <input onClick={cancleUser} type="button" value="Cancle" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddUser;
