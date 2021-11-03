import axios from "axios";
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { Table } from "antd";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router";

export const Datatabel = () => {
  const columns = [
    {
      title: "Sr ",
      width: 100,
      //return:(index)=> index + 1 ,
      dataIndex: "i",
      key: "i",
    },
    {
      title: "Name",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "1",
      width: 150,
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
      width: 150,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 150,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 150,
    },

    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      fixed: "right",
      width: 100,
      render: (_id) => (
        <a>
          <button type="button" className="btn btn-primary">
            Edit{_id}
          </button>
          <button
            onClick={() => {
              const confirmBox = window.confirm(
                "Do you really want to delete this User ?"
              );
              if (confirmBox === true) {
                deleteUser(_id);
              }
            }}
            type="button"
            className="btn btn-danger"
          >
            Delete
          </button>
        </a>
      ),
    },
  ];

  const [user, setUser] = useState();
  const [page, setPage] = useState(1000);
  const search = {
    page: 1,
    limit: page,
    search: "",
    phonenumber: "",
  }

  //delele User Functions
  const deleteUser = (_id) => {
    const deleteUrl = `http://192.168.1.196:8090/api/user/delete-user/${_id}`;
    axios
      .delete(deleteUrl, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data.data);
      });
  };

  //getUserList
  const Pagination = {
    page: 1,
    limit: page,
    search: "",
    phonenumber: "",
  };
  const listData = async () => {
    const baseURL = `http://192.168.1.196:8090/api/user/user-list`;
    const response = await axios.post(baseURL, Pagination, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    });

    console.log(response.data.data);
    setUser(response.data.data);
  };

  useEffect(() => {
    listData();
  }, []);

  //Logout Function
  const userLogout = useHistory();
  const logOut = () => {
    localStorage.clear("token");
    userLogout.push("/");
  };

  return (
    <div>
      <Nav />
      <nav class="navbar navbar-light bg-light justify-content-between">
        <h5>
          <b>Welcome have a Good Day</b>
        </h5>
        <form class="form-inline">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-1  mx-1" type="submit">
            Search
          </button>

          <button type="button" className="btn btn-primary my-1 mx-2">
            Adduser
          </button>
          <button
            onClick={logOut}
            type="button"
            className="btn btn-danger my-1 mx-2"
          >
            Logout
          </button>
        </form>
      </nav>

      <Table columns={columns} dataSource={user} />
    </div>
  );
};
