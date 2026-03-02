import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const CreatePrescription = () => {
  const { doctor, mail, name } = useParams();
  const datac = new Date();
  const datecc = datac.toDateString();
  const notify = () => toast.success("Successfully Prescribed");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.doctor = doctor;
    data.patient = name;
    data.pmail = mail;
    data.date = datecc;
    console.log(data);
    axios.post("https://project-101-doctor.herokuapp.com/pres-info", data);
    notify();
  };
  console.log(errors);

  return (
    <>
      <Container className=" mt-5">
        <ToastContainer />
        <h2 className="text-center mb-5">Create Prescription</h2>
        <div>
          <Row>
            <Col
              className="border border-primary rounded"
              md={{ span: 10, offset: 1 }}
            >
              <div className="d-flex p-5">
                <div>
                  <img src="prs.svg" alt="" width="80%" />
                </div>
                <div style={{ marginTop: "5rem", width: "100%" }}>
                  <h1>{doctor}</h1>
                  <p>Patient Name : {name}</p>
                  <p style={{ marginTop: "-1rem" }}>Patient Contact : {mail}</p>
                  <p>Date : {datecc}</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              className="border border-primary rounded"
              style={{ backgroundColor: "white" }}
              md={{ span: 10, offset: 1 }}
            >
              <Row>
                <Col lg={4} className="">
                  <img
                    className="ms-2 mt-5"
                    src="https://svg-clipart.com/svg/logo/TRwCe6n-rx-logo-vector.svg"
                    alt=""
                    width="50%"
                  />
                </Col>
                <Col className="">
                  <div style={{ marginTop: "3rem" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <textarea
                        style={{
                          width: "100%",
                          height: "400px",
                          marginLeft: "-90px",
                        }}
                        {...register("Prescriptions", {})}
                        placeholder="Medication"
                      />
                      {/* <header className="App-header">
                        <Editor editorState={editorState} />

                      </header> */}

                      <br />
                      <Button
                        className="p-3 mb-5 w-25"
                        style={{ marginLeft: "-90px" }}
                        variant="primary"
                        type="submit"
                      >
                        Submit Prescription
                      </Button>
                      {/* <Button
                        className="p-3 mb-5 w-25"
                        style={{ marginLeft: "0px" }}
                        variant="primary"
                        type="submit"
                      >
                        Done
                      </Button> */}
                    </form>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
      <br />
    </>
  );
};

export default CreatePrescription;
