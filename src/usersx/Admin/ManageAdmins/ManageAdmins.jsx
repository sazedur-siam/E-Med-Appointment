import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import MAC from "./MAC";

const ManageAdmins = () => {
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState([]);

  useEffect(() => {
    axios.get("https://project-101-doctor.herokuapp.com/users").then((data) => {
      setUsers(data.data);
      setFilterUser(users.filter((data) => data.role !== "doctor"));
    });
  }, [users]);
  let totalUser = 0;
  let activeAdmin = 0;
  filterUser.forEach((data) => {
    if (data.role !== "doctor") {
      totalUser = totalUser + 1;
    }
    if (data.role === "admin") {
      activeAdmin = activeAdmin + 1;
    }
  });

  return (
    <Container>
      <h2 className="text-center mt-5 fw-bold">Admin Management</h2>
      <div className="w-50 mt-5">
        <p>Total User's : {totalUser}</p>
        <p>Active Admin's : {activeAdmin}</p>
      </div>
      <Container>
        <Row>
          {/* <Col lg={4} style={{ border: "" }}>
            <h3 className="text-center mt-5">Add Admin</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="w-100"
                type="email"
                placeholder="Enter Admin Email"
                {...register("email", {})}
              />
              <br />
              <Button className=" mt-3" variant="info" type="submit">
                Add Admin
              </Button>
              <Alert className="mt-5" severity="warning">
                Only Registerterd user with valid Email can be an admin and able to logged in as
                an admin
              </Alert>
            </form>
          </Col> */}
          <Col
            lg={12}
            className=""
            style={{ borderLeft: "5px solid lightblue" }}
          >
            <Table striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th style={{ width: "23.7rem" }}>Name</th>
                  <th style={{ width: "23.7rem" }}>Mail</th>
                  <th style={{ width: "6.2rem" }}>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
            </Table>
            <div
              style={{
                height: "600px",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              <Table
                striped
                bordered
                hover
                className="w-100 p-3 text-center mx-auto mt-5 ob"
              >
                <tbody>
                  {filterUser.map((data) => (
                    <MAC key={data._id} data={data}></MAC>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default ManageAdmins;
