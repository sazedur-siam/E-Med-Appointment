import { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";
import DocCard from "./DocCard";

const Docx = () => {
  const { user } = useAuth();
  const [morder, setMorder] = useState([]);
  const [filteredData, setFIlteredData] = useState([]);
  useEffect(() => {
    fetch("https://project-101-doctor.herokuapp.com/users-info")
      .then((res) => res.json())
      .then((data) => {
        setMorder(data);
        setFIlteredData(
          morder.filter((mor) => mor.Doctor === user.displayName),
        );
      });
  }, [morder, filteredData, user.displayName]);

  return (
    <Container className="mt-5">
      <h2 className="text-center" style={{ fontSize: "50px" }}>
        Patient List
      </h2>
      <Container className="obx">
        {filteredData.length === 0 ? (
          <Alert variant="warning">No Appointment Available</Alert>
        ) : (
          <Container>
            {filteredData.map((fdata) => (
              <DocCard key={fdata._id} data={fdata}></DocCard>
            ))}
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default Docx;
