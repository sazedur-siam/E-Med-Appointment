import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Stack,
} from "react-bootstrap";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDoctorlist from "../../../hooks/useDoctorlist";
import MDCard from "./MDCard";

const ManageDoctor = () => {
  const [doctorlists] = useDoctorlist();
  const [morder, setMorder] = useState([]);
  const [filteredData, setFIlteredData] = useState([]);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    srch(data.svalue);
  };
  const srch = (data) => {
    setFIlteredData(
      morder.filter((mor) => mor.name.toLowerCase().includes(data)),
    );
  };

  useEffect(() => {
    fetch("https://project-101-doctor.herokuapp.com/doctorlist")
      .then((res) => res.json())
      .then((data) => {
        setMorder(data);
      });
  }, [filteredData]);
  console.log(morder);
  const hc = () => {
    setFIlteredData(doctorlists);
  };
  const hcc = (xx) => {
    setFIlteredData(morder.filter((mor) => mor.department === xx));
  };
  return (
    <>
      <ToastContainer />
      <Container className="c-body">
        <h2 className="text-center" style={{ fontSize: "50px" }}>
          Manage Doctors
        </h2>

        <Container className="">
          <InputGroup className="mb-3 slide-in-top">
            <form className="w-100 d-flex" onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                placeholder="Search Doctor"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                {...register("svalue", {})}
              />
              <Button type="Submit" variant="secondary" id="button-addon2">
                Search
              </Button>
            </form>
          </InputGroup>
          <Row className="">
            <Col
              lg={2}
              className="mt-5  hh"
              style={{ height: "200px", marginTop: "2rem" }}
            >
              <Stack gap={3} className="mt-4 slide-in-elliptic-top-fwd">
                <div className="">
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          hc();
                        }}
                        name="gilad"
                      />
                    }
                    label="All Department"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          hcc("Chest");
                        }}
                        name="gilad"
                      />
                    }
                    label="Chest"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          hcc("Medicine");
                        }}
                        name="gilad"
                      />
                    }
                    label="Medicine"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          hcc("Dermatology");
                        }}
                        name="gilad"
                      />
                    }
                    label="Dermatology"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          hcc("Psychiatry");
                        }}
                        name="gilad"
                      />
                    }
                    label="Psychaiatry"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          hcc("General Physician");
                        }}
                        name="gilad"
                      />
                    }
                    label="General Physician"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          hcc("Diabetes");
                        }}
                        name="gilad"
                      />
                    }
                    label="Diabetes"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          hcc("Neuromedicine");
                        }}
                        name="gilad"
                      />
                    }
                    label="Neuromedicine"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          hcc("Gynaecology");
                        }}
                        name="gilad"
                      />
                    }
                    label="Gynaecology"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          hcc("Nutritionest");
                        }}
                        name="gilad"
                      />
                    }
                    label="Nutritionest"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          hcc("Eye");
                        }}
                        name="gilad"
                      />
                    }
                    label="Eye"
                  />
                </div>
              </Stack>
            </Col>
            <Col lg={10} className="o-c">
              {filteredData.length === 0 ? (
                <div className=" gc-x ob mt-5  slide-in-top">
                  {doctorlists.map((doctor) => (
                    <MDCard key={doctor._id} doctor={doctor}></MDCard>
                  ))}
                </div>
              ) : (
                <div className=" gc-x ob mt-5  slide-in-top">
                  {filteredData.map((doctor) => (
                    <MDCard key={doctor._id} doctor={doctor} hc={hc}></MDCard>
                  ))}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default ManageDoctor;
