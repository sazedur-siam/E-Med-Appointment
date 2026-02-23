import { Divider } from "@mui/material";
import React from "react";
import { Container, Nav, Navbar, Button, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navigation = () => {
  const { user, logout, admin, doctor } = useAuth();
  const navigate = useNavigate();
  const [a, setA] = React.useState(0);
  const [b, setB] = React.useState(0);
  const [c, setC] = React.useState(0);
  React.useEffect(() => {
    user.email ? setA(1) : setA(0);
  }, [user.email]);
  React.useEffect(() => {
    admin ? setB(1) : setB(0);
  }, [admin]);
  React.useEffect(() => {
    doctor ? setC(1) : setC(0);
  }, [doctor]);
  React.useEffect(() => {
    if (b === 1) {
      setA(0);
      setC(0);
    } else if (c === 1) {
      setA(0);
      setB(0);
    }
  }, [b, c]);

  React.useEffect(() => {
    if (admin) {
      localStorage.setItem("isAdm", admin);
    } else {
      localStorage.setItem("isAdm", admin);
    }
  }, [admin]);
  React.useEffect(() => {
    if (doctor) {
      localStorage.setItem("isDoc", doctor);
    } else {
      localStorage.setItem("isDoc", doctor);
    }
  }, [doctor]);
  return (
    <div>
      <Navbar
        className="bgn"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/home">
            <img src="./logo_brand.png" alt="" width="200px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              {Boolean(c) || Boolean(b) ? (
                <span></span>
              ) : (
                <Nav.Link as={Link} to="/doctors">
                  Doctors
                </Nav.Link>
              )}
              <a
                style={{
                  textDecoration: "none",
                  color: "gray",
                  marginTop: "8px",
                  marginLeft: "5px",
                }}
                href="https://www.emedicshops.com/"
                target="_blank"
                rel="noreferrer"
              >
                E-Medic Shop 
              </a>
                   <a
                style={{
                  textDecoration: "none",
                  color: "gray",
                  marginTop: "8px",
                  marginLeft: "5px",
                }}
                href="https://drive.google.com/file/d/17VcJjftxXqmw3hty8WZP1INK8c5caxNQ/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
              >
                E-Medic Reminder App
              </a>
              {/* <Nav.Link as={Link} to="/lab">
                lab
              </Nav.Link> */}
            </Nav>
            <Nav>
              <Nav.Link>
                {Boolean(b) ? (
                  <>
                    <NavDropdown title="Admin Dashbord" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/addnewdoctor">
                        Add Doctors
                      </NavDropdown.Item>
                       <Divider />
                      <NavDropdown.Item as={Link} to="/mngdoctors">
                        Manage Doctors
                      </NavDropdown.Item>
                      <Divider />
                      <NavDropdown.Item as={Link} to="/mngadmins">
                        Manage Admins
                      </NavDropdown.Item>
                      <Divider />
                       <NavDropdown.Item as={Link} to="/user-profile">
                        All Users Profile
                      </NavDropdown.Item>
                      <Divider />
                      <NavDropdown.Item as={Link} to="/pdetails">
                        All Patient Appointments
                      </NavDropdown.Item>
                      <Divider />
                      <Button
                        className="w-100"
                        onClick={() => {
                          logout();
                          window.location.reload();
                        }}
                        variant="outline-secondary "
                      >
                        Logout
                      </Button>
                    </NavDropdown>
                  </>
                ) : Boolean(a) ? (
                  <>
                    <NavDropdown
                      title={user.displayName}
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item as={Link} to="/myappointment">
                        My Appointment
                      </NavDropdown.Item>
                      <Divider />
                      <NavDropdown.Item as={Link} to="/empres">
                        E-Medic Prescription
                      </NavDropdown.Item>
                      <Divider />
                      <NavDropdown.Item as={Link} to="/myprescription">
                        All Prescription
                      </NavDropdown.Item>
                      <Divider />

                      <Button
                        className="w-100"
                        onClick={() => {
                          logout();
                          window.location.reload();
                        }}
                        variant="outline-secondary "
                      >
                        Logout
                      </Button>
                    </NavDropdown>
                  </>
                ) : Boolean(c) ? (
                  <>
                    <NavDropdown
                      title={`Logged in as :  ${user.displayName}`}
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item as={Link} to="/docdash">
                        Appointed Patient
                      </NavDropdown.Item>
                      <Divider />

                      <Button
                        className="w-100"
                        onClick={() => {
                          logout();
                          window.location.reload();
                        }}
                        variant="outline-secondary "
                      >
                        Logout
                      </Button>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline-warning"
                      onClick={() => navigate("/login")}
                    >
                      Login | Register
                    </Button>
                  </>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
