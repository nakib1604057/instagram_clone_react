import { useEffect, useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import FirebaseContext from "../contexts/firebase";
import * as ROUTES from "../constants/routes";

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const isValid = userEmail === "" || userPassword === "";
  const handelLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(userEmail, userPassword);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setUserEmail("");
      setUserPassword("");
      setError(error.message);
    }
  };
  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iphone with instance" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col justify-center w-full bg-white p-4 border border-gray-primary rounded mb-4">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4 "
            />
          </h1>

          {error && (
            <p className="mb-4 text-xs text-red-primary font-bold">{error}</p>
          )}
          <form method="post" onSubmit={handelLogin}>
            <input
              type="email"
              aria-label="Enter your eamil address"
              placeholder="eamil address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => {
                setUserEmail(target.value);
              }}
            />
            <input
              type="password"
              aria-label="Enter your password"
              placeholder="password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => {
                setUserPassword(target.value);
              }}
            />
            <button
              disabled={isValid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded font-bold h-8 ${
                isValid && "opacity-50"
              }`}
            >
              LogIn
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Dont't have an account?{``}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
