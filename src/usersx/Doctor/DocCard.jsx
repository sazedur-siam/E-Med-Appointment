import axios from "axios";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DocCard = (props) => {
  const notify = () => toast.success("Appointment Approved");
  const notify2 = () => toast.success("Appointment Canceled");
  const { _id, Doctor, Name, Email, apdate, aptime, detail, apstatus, url } =
    props.data;
  const handleStatus = (id) => {
    // axios.put(`https://project-101-doctor.herokuapp.com/users-info/${id}`);
    axios.put(`https://project-101-doctor.herokuapp.com/users-info/${id}`, {
      apstatus: "Approved",
    });
    notify();
  };
  const handleDelete = (id) => {
    const isDelete = window.confirm(
      "Are you sure , you want to cancel appointment ?",
    );
    if (isDelete) {
      fetch(`https://project-101-doctor.herokuapp.com/users-info/${id}`, {
        method: "DELETE",
      });
      notify2();
      setTimeout(() => {
        window.location.reload(false);
      }, 500);
    }
  };
  return (
    <Container style={{ marginBottom: "20px", marginTop: "20px" }}>
      <ToastContainer />
      <Card style={{ border: "1px solid blue" }}>
        <Card.Body>
          <Container>
            <Row>
              <Col lg={4}>
                <Zoom>
                  <img
                    alt="that wanaka tree"
                    src={url}
                    width="390px"
                    height="400px"
                  />
                </Zoom>
              </Col>
              <Col lg={6}>
                <h3>Appointed Doctor : {Doctor}</h3>
                <p>Appointment Status : {apstatus} </p>

                <div className="mt-5">
                  <h5>
                    Patient Name :{" "}
                    <Link to={`/docdash/viewpdata/${Email}/${Name}`}>
                      <Button variant="outline-info">{Name}</Button>
                    </Link>
                  </h5>
                  <p className="fw-bold">Patient Contact : {Email}</p>
                  <p className="fw-bold">
                    Appointed Date : {apdate.substr(0, 10)}
                  </p>
                  <p className="fw-bold">Appointed Time : {aptime}</p>
                </div>
                <p className="text-center fw-bold">Problem Details</p>
                <Card.Text>{detail}</Card.Text>
                <div style={{ width: "50rem" }}>
                  <Button
                    className={apstatus === "Approved" ? "d-none" : "ms-2"}
                    onClick={() => {
                      handleDelete(_id);
                    }}
                    variant="danger"
                  >
                    Cancel Appointment
                  </Button>
                  <Button
                    onClick={() => {
                      handleStatus(_id);
                      SetStatus(true);
                    }}
                    className={apstatus === "Approved" ? "d-none" : "ms-2"}
                    variant="success"
                  >
                    Approve Appointment
                  </Button>

                  <Link
                    to={`/create-prescription/${Doctor}/${Email}/${Name}/${_id}`}
                  >
                    <Button className="ms-2" variant="primary">
                      Create Prescription
                    </Button>
                  </Link>
                </div>
              </Col>
              <Col lg={2}></Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DocCard;
