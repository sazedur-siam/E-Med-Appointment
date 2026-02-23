import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import initializeAuthentication from "../../firebase/firebase.init";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { User, Mail, Phone, Calendar, Lock, UserPlus, Chrome, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/Card";

initializeAuthentication();

const Registration = () => {
  const { registerUser, SetUser, auth, updateProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const password1 = watch("password1");

  const genRandom = (num) => {
    return Math.floor(Math.random() * num) + 1;
  };

  const saveUser = (email, displayName) => {
    const user = { email, displayName };
    axios.post("https://project-101-doctor.herokuapp.com/users/", user);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    const pass = data.password1;
    const pass2 = data.password2;
    const email = data.mail;
    const name = data.displayName;

    if (pass !== pass2) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (pass.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    data.img_url = `https://randomuser.me/api/portraits/men/${genRandom(100)}.jpg`;
    const img_url = `https://randomuser.me/api/portraits/men/${genRandom(100)}.jpg`;

    try {
      await axios.post('https://project-101-doctor.herokuapp.com/reg-user-info', data);
      
      const userCredential = await registerUser(name, email, pass);
      const updatedUser = { email, displayName: name };
      SetUser(updatedUser);
      
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: img_url,
      });
      
      localStorage.setItem("isAuth", "true");
      saveUser(email, name);
      setSuccess(true);
      
      setTimeout(() => {
        navigate(location.state?.from || "/home");
      }, 1500);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    setError("");
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      saveUser(user.email, user.displayName);
      localStorage.setItem("isAuth", "true");
      navigate(location.state?.from || "/home");
    } catch (err) {
      setError("Google registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block"
        >
          <div className="relative">
            <motion.img
              src="/registration.svg"
              alt="Medical Registration"
              className="w-full h-auto drop-shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 glass-effect px-6 py-3 rounded-xl shadow-xl"
            >
              <p className="text-sm font-semibold text-gray-700">Join us today! 🎉</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Registration Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center space-y-2 pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <UserPlus className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
              <p className="text-gray-600">Join E-Medic today and get started</p>
            </CardHeader>

            <CardContent className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Registration successful! Redirecting...</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="John Doe"
                      className="pl-10"
                      {...register("displayName", { required: "Name is required" })}
                    />
                  </div>
                  {errors.displayName && (
                    <p className="text-red-500 text-xs">{errors.displayName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      className="pl-10"
                      {...register("mail", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                  </div>
                  {errors.mail && (
                    <p className="text-red-500 text-xs">{errors.mail.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Age</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="number"
                        placeholder="25"
                        className="pl-10"
                        {...register("Age", { 
                          required: "Age is required",
                          min: { value: 1, message: "Age must be positive" },
                          max: { value: 120, message: "Invalid age" }
                        })}
                      />
                    </div>
                    {errors.Age && (
                      <p className="text-red-500 text-xs">{errors.Age.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="tel"
                        placeholder="+1234567890"
                        className="pl-10"
                        {...register("contact", { required: "Phone is required" })}
                      />
                    </div>
                    {errors.contact && (
                      <p className="text-red-500 text-xs">{errors.contact.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="password"
                      placeholder="Create a strong password"
                      className="pl-10"
                      {...register("password1", { 
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                    />
                  </div>
                  {errors.password1 && (
                    <p className="text-red-500 text-xs">{errors.password1.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                      {...register("password2", { 
                        required: "Please confirm your password",
                        validate: value => value === password1 || "Passwords do not match"
                      })}
                    />
                  </div>
                  {errors.password2 && (
                    <p className="text-red-500 text-xs">{errors.password2.message}</p>
                  )}
                </div>

                <div className="text-sm">
                  <span className="text-gray-600">Already have an account? </span>
                  <Link 
                    to="/login" 
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Sign in here
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading || success}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or register with</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleGoogle}
                  disabled={isLoading || success}
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Sign up with Google
                </Button>
              </form>
            </CardContent>

            <CardFooter className="text-center text-sm text-gray-600">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-primary-600 hover:underline">
                Terms & Privacy
              </a>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Registration;
