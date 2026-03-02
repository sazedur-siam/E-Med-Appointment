import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import storage from "../../../firebase/firebase.storage.config";
import useAuth from "../../../hooks/useAuth";
import "./style.css";

const AddNewDoctor = () => {
  const [Bmdcx, SetBmdcx] = useState([]);
  useEffect(() => {
    axios
      .get("https://project-101-doctor.herokuapp.com/doctorlist")
      .then((data) => SetBmdcx(data.data));
  }, []);

  const notify = () => toast.success("Doctor Added Successfully!");
  const notify2 = () =>
    toast.warn("A Doctor Already Registered With this BMDC ");
  const { logout, registerUser, SetUser, auth, updateProfile } = useAuth();
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState([]);
  const [progress, setProgress] = useState(0);
  const [presUrl, setPresUrl] = useState("");
  const navigate = useNavigate();
  const saveUser = (email, displayName, role) => {
    const user = { email, displayName, role };
    axios.post("https://project-101-doctor.herokuapp.com/users/", user);
  };

  const bChange = (e) => {
    // eslint-disable-next-line array-callback-return
    Bmdcx.filter((data) => {
      if (data.bmdc !== e.target.value) {
        console.log("");
      } else {
        notify2();
      }
    });
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const storageRef = ref(storage, `/files/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setPresUrl(url);
        });
      },
    );
  };
  const sendDataToServer = (data) => {
    axios.post("https://project-101-doctor.herokuapp.com/doctorlist", data);
    console.log(data);
  };
  const onSubmit = (data) => {
    data.img = presUrl;
    registerUser(data.name, data.Mail, data.pass)
      .then((userCredential) => {
        const updatedUser = { email: data.Mail, displayName: data.name };
        SetUser(updatedUser);
        updateProfile(auth.currentUser, {
          displayName: data.name,
        }).then(() => {
          saveUser(data.Mail, data.name, "doctor");
          navigate("/home");
          logout();
        });
      })
      .catch((error) => {});
    data.pass = "";
    sendDataToServer(data);
    notify();
  };
  return (
    <Container style={{ marginTop: "70px" }}>
      <ToastContainer />
      <Row>
        <Col>
          <img className="mt-5 slide-in-top" src="./addoc.svg" alt="" />
        </Col>
        <Col>
          <div className="add-service">
            <h2 className="text-center">
              <span>Doctor Registration</span>
            </h2>
            <form
              className="from-container-xxo slide-in-elliptic-top-fwd"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                placeholder="Doctor Name"
                {...register("name", { required: true })}
              />
              <input
                type="password"
                placeholder="Enter Password"
                {...register("pass", { required: true })}
              />

              <input
                type="email"
                placeholder="Mail"
                {...register("Mail", { required: true })}
              />
              <input
                type="text"
                placeholder="Degree"
                {...register("degree", { required: true })}
              />
              <input
                type="text"
                placeholder="Speciality"
                {...register("speciality", { required: true })}
              />
              <input
                type="text"
                placeholder="Visiting Hour"
                {...register("time", { required: true })}
              />
              <input
                type="text"
                placeholder="Chamber"
                {...register("chember", { required: true })}
              />
              <select {...register("department", { required: true })}>
                <option value="Chest">Chest</option>
                <option value="Medicine">Medicine</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="General Physician">General Physician</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Neuromedicine">Neuromedicine</option>
                <option value="Gynaecology">Gynaecology</option>
                <option value="Nutritionest">Nutritionest</option>
                <option value="Eye">Eye</option>
              </select>
              <input
                type="number"
                placeholder="Fee"
                {...register("fee", { required: true })}
              />
              <input
                type="number"
                placeholder="Experience"
                {...register("experience", { required: true })}
              />
              <input
                type="text"
                onChangeCapture={bChange}
                placeholder="BMDC Registration Number"
                {...register("bmdc", { required: true })}
              />
              <br />
              <p>Upload Doctor Image</p>
              <br />
              <div className="d-flex mt-3">
                <input
                  type="file"
                  onChangeCapture={handleChange}
                  placeholder="Prescription"
                />
                <Button variant="outline-primary" onClick={handleUpload}>
                  Upload
                </Button>
              </div>
              <div className="d-flex">
                <span>{progress === 0 ? "" : progress}</span>
                <span>{progress === 0 ? "" : "% upload complete"}</span>
              </div>
              <Button
                className=" p-3 roll-in-left"
                variant="primary"
                type="Submit"
              >
                Register
              </Button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNewDoctor;
