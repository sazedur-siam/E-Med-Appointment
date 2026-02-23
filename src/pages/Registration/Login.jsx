import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Chrome, Stethoscope, AlertCircle } from "lucide-react";
import initializeAuthentication from "../../firebase/firebase.init";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/Card";

initializeAuthentication();

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { logout, login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const saveUser = (email, displayName) => {
    const user = { email, displayName };
    axios.put("https://project-101-doctor.herokuapp.com/users", user);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      logout();
      await login(data.mail, data.pass);
      localStorage.setItem("isAuth", "true");
      navigate("/home");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
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
      navigate("/home");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-green-50">
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
              src="/login.svg"
              alt="Medical Login"
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
              <p className="text-sm font-semibold text-gray-700">Welcome Back! 👋</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Login Form */}
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
                className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <LogIn className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
              <p className="text-gray-600">Sign in to access your account</p>
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

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      className="pl-10"
                      {...register("mail", { required: "Email is required" })}
                    />
                  </div>
                  {errors.mail && (
                    <p className="text-red-500 text-xs">{errors.mail.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                      {...register("pass", { required: "Password is required" })}
                    />
                  </div>
                  {errors.pass && (
                    <p className="text-red-500 text-xs">{errors.pass.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <Link 
                    to="/registration" 
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Don't have an account?
                  </Link>
                  <a href="#" className="text-gray-600 hover:text-gray-700">
                    Forgot password?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleGoogle}
                  disabled={isLoading}
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Sign in with Google
                </Button>

                <Link to="/doctorlogin" className="block">
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    size="lg"
                  >
                    <Stethoscope className="w-5 h-5 mr-2" />
                    Login as Doctor
                  </Button>
                </Link>
              </form>
            </CardContent>

            <CardFooter className="text-center text-sm text-gray-600">
              By signing in, you agree to our{" "}
              <a href="#" className="text-primary-600 hover:underline">
                Terms of Service
              </a>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
