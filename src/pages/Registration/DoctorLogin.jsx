import { Button, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import initializeAuthentication from "../../firebase/firebase.init";
import useAuth from "../../hooks/useAuth";
import "./animation.css";
import "./style.css";

initializeAuthentication();
const DocotorLogin = () => {
  const { register, handleSubmit } = useForm();
  const { logout } = useAuth();
  const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    logout();
    login(data.mail, data.pass).then((res) => {
      localStorage.setItem("isAuth", "true");
      navigate("/home");
    });
    navigate("/home");
  };

  return (
    <div className="bgr">
      <Container>
        <Row>
          <h2
            className="text-center bounce-in-top"
            style={{ marginTop: "6rem" }}
          >
            Doctor Login
          </h2>
          <Col xs={12} lg={6} className="">
            <img
              className="slide-in-top"
              src="doclogin.png"
              alt="registration_picture"
              width="100%"
            />
          </Col>
          <Col
            lg={6}
            style={{ marginTop: "10rem" }}
            className=" slide-in-elliptic-top-fwd"
          >
            <form
              className="from-container mt-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="email"
                placeholder="Enter Your mail"
                {...register("mail", {})}
              />
              <input
                type="password"
                placeholder="Enter Password"
                {...register("pass", {})}
              />
              <Button
                className="roll-in-left btnx"
                type="Submit"
                variant="primary"
              >
                Login
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DocotorLogin;
