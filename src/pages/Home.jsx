import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { CgArrowTopRightR } from "react-icons/cg";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const Home = () => {
  const [show, setShow] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // =========================================== POST =========================================== \\
  const [newData, setNewData] = useState({
    name: "",
    username: "",
    group_name: "other",
    number: "",
    group_num: "",
    site: "",
  });

  const handleSaveChanges = () => {
    axios
      .post("http://localhost:3000/user", newData)
      .then((result) => {
        setData([...data, result.data]);
        setFilter([...data, result.data]);
        handleClose();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };
  const handleValue = (e) => {
    setNewData({
      ...newData,
      [e.target.id]: e.target.value,
    });
  };
  //  =========================================== POST =========================================== \\
  // =================================== useEffect() \\
  useEffect(() => {
    axios
      .get("http://localhost:3000/data")
      .then((result) => {
        setData(result.data);
        setFilter(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  // =================================== useEffect() \\
  const handleFilter = (e) => {
    setFilterText(e.target.value.toLowerCase());
    const filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(filterText) ||
        item.username.toLowerCase().includes(filterText) ||
        item.group_name.toLowerCase().includes(filterText) ||
        item.phone.toLowerCase().includes(filterText) ||
        item.socails.toLowerCase().includes(filterText)
    );
    setFilter(filteredData);
  };

  return (
    <div className="container">
      <div className="input-group my-4">
        <input
          type="text"
          name="search"
          id="search"
          className="form-control input-lg"
          placeholder="Write hire..."
          onChange={handleFilter}
        />
        <button
          className="button btn btn-success w-25 btn-lg"
          onClick={handleShow}
        >
          Adding
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Your Name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              @Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              placeholder="Your Regions"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="group_num" className="form-label">
              Your Group Name
            </label>
            <select
              name="group_num"
              id="group_num"
              className="form-select"
              onChange={handleValue}
            >
              <option value="others">Others...</option>
              <option value="react">React Dev</option>
              <option value="vue">Vue dev</option>
              <option value="angular">Angular dev</option>
              <option value="python">Python dev</option>
              <option value="java">Java dev</option>
              <option value="sharpist">(C#)Sharp dev</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Phone Numbers
            </label>
            <input
              type="text"
              name="number"
              id="number"
              className="form-control"
              placeholder="Your Number +998"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="group_num" className="form-label">
              Your Group Number
            </label>
            <select
              name="group_num"
              id="group_num"
              className="form-select"
              onChange={handleValue}
            >
              <option value="n45">n45</option>
              <option value="n38">n38</option>
              <option value="n24">n24</option>
              <option value="n55">n55</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="site" className="form-label">
              Your Socails
            </label>
            <input
              type="text"
              name="site"
              id="site"
              className="form-control"
              placeholder="https://"
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <table className="table text-center">
        <thead>
          <tr>
            <th className="border">#</th>
            <th className="border">Name</th>
            <th className="border">Username</th>
            <th className="border">Group Name</th>
            <th className="border">Group Number</th>

            <th className="border">Phone</th>
            <th className="border">Socails</th>
            <th className="border">Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {filter.map((item, i) => (
            <tr key={i}>
              <td className="border">{item.id}</td>
              <td className="border">{item.name}</td>
              <td className="border">{item.username}</td>
              <td className="border">{item.group_name}</td>
              <td className="border">{item.group_number}</td>
              <td className="border">{item.phone}</td>
              <td className="border">{item.socails}</td>
              <td className="border d-flex gap-2">
                <button
                  className="btn btn-warning w-50"
                  onClick={() => handleEdit(item.id)}
                >
                  <FaPen />
                </button>
                <button
                  className="btn btn-danger w-50"
                  onClick={() => handleDelete(item.id)}
                >
                  <FaTrashAlt />
                </button>
                <button
                  className="btn btn-secondary w-50"
                  onClick={() => handleMove(item.id)}
                >
                  <CgArrowTopRightR />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
