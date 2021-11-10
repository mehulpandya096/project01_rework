import axios from "axios";
import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { Table } from "antd";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router";

export const Datatabel = () => {
  const history = useHistory();
  const loginStatus = () => {
    const item = localStorage.getItem("token");
    if (item === null) {
      history.push("/");
    }
  };

  useEffect(() => {
    loginStatus();
  }, []);
  const columns = [
    {
      title: "Sr",
      key: "index",
      width: 100,
      render: (text, record, index) => <b>{index + 1}</b>,
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
          <button
            onClick={() => {
              editUserId(_id);
            }}
            type="button"
            className="btn btn-primary "
          >
            Edit
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
            className="btn btn-danger my-1"
          >
            Delete
          </button>
        </a>
      ),
    },
  ];

  const [user, setUser] = useState();
  const [page, setPage] = useState(1000);

  //Search user by name and number
  const searchUser = {
    page: 1,
    limit: page,
    search: "",
    phonenumber: "",
  };
  const [searchUse, setSearchUse] = useState(searchUser);
  const { search, phonenumber } = searchUse;

  const onSearch = (e) => {
    setSearchUse({ ...searchUse, [e.target.name]: e.target.value });
    console.log(`search value`, searchUse);
    if (e.target.value === "") {
      listData();
    }
  };

  const onSearchsubmit = (e) => {
    e.preventDefault();
    Pagination.phonenumber = searchUse.phonenumber;
    Pagination.search = searchUse.search;
    listData();
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
        listData();
      });
  };

  //Edit User
  // const history = useHistory();
  const editUserId = (_id) => {
    history.push("/edituser/" + _id);
  };

  const addUser = useHistory();
  const addNewUser = () => {
    addUser.push("/AddUser");
  };

  return (
    <div>
      <Nav />
      <nav className="navbar navbar-light bg-light justify-content-between">
        <h5 className="sticky-top">
          <b>Welcome have a Good Day</b>
        </h5>
        <form className="form-inline">
          {/* Search by name  */}
          <input
            onChange={onSearch}
            value={search}
            name="search"
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search by Name"
            aria-label="Search"
          />
          {/* Search by number  */}
          <input
            onChange={onSearch}
            value={phonenumber}
            name="phonenumber"
            className="form-control mr-sm-2 my-2"
            type="search"
            placeholder="Search by Number"
            aria-label="Search"
          />

          <button
            onClick={onSearchsubmit}
            className="btn btn-outline-success my-1  mx-1"
            type="submit"
          >
            Search
          </button>

          <button
            onClick={addNewUser}
            type="button"
            className="btn btn-primary  mx-2"
          >
            Adduser
          </button>
        </form>
      </nav>
      <Table columns={columns} dataSource={user} />
    </div>
  );
};
