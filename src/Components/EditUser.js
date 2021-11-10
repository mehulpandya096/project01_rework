import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import "./AddUser.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {

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
    gender: "",
    phone_number: "",
  };

  let { id } = useParams();
  const [adduser, setaddUser] = useState(initialState);
  const { name, gender, phone_number } = adduser;

  const [error, setError] = useState("");
  let errors = {
    errname: "",
    errphone: "",
  };

  const history = useHistory();
  const onChange = (e) => {
    userValidation();
    setaddUser({ ...adduser, [e.target.name]: e.target.value });
    console.log(adduser);
  };

  const resApi = () => {
    if (adduser.name === "") {
      
      return false;
    }

    if (adduser.phone_number === "") {
      return false;
    }
    return true;
  };

  //onSubmit With Api
  const onSubmit = (e) => {
    e.preventDefault();
    let auth = userValidation();
    setError(auth);

    if (resApi()) {
      const putUrl = `http://192.168.1.196:8090/api/user/edit-user`;
      axios
        .put(putUrl, adduser, {
          headers: {
            "content-type": "application/json",
            accept: "application/json",
            Authorization: "bearer " + localStorage.getItem("TOKEN"),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            erHandling(response.data.message);
            setTimeout(() => {
              history.push("/datatable");
            }, 3000);
          } else if (response.status !== 200) {
            setTimeout(() => {
              history.push("/");
            }, 3000);
          }
        });
    }
  };

  const erHandling = (message) => {
    toast(message);
  };

  //GET user By id API`
  useEffect(async () => {
    const url = `http://192.168.1.196:8090/api/user/get-user/${id}`;
    await axios
      .get(url, {
        headers: {
          Authorization: `bearer ` + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const userResponse = response.data.data;
        setaddUser(userResponse);
      });
  }, []);

  //Cancle Function
  const cancleUser = () => {
    history.push("/datatable");
  };

  const userValidation = () => {
    if (adduser.name === "") {
      errors.errname = "Name is required";
    }

    if (adduser.phone_number === "") {
      errors.errphone = "Phone number is required";
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
        <div className="title">Edit-User</div>
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

              {/* <div className="gender-details">
                <label className="gender-title">Gender</label>

                <select
                  className="gender-title"
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
              </div> */}
              <div className="button">
                <input type="submit" value="Update User" />
              </div>

              <div className="button">
                <input onClick={cancleUser} type="button" value="Cancle" />
              </div>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditUser;
