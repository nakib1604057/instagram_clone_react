import { useEffect, useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import FirebaseContext from "../contexts/firebase";
import * as ROUTES from "../constants/routes";
import { doesUserNameExist } from "../services/firebase";

const Signup = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [userEmail, setUserEmail] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userName, setUserName] = useState("");

  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const isValid = userEmail === "" || userPassword === "";
  const handelSignup = async (event) => {
    event.preventDefault();
    const usernameExist = await doesUserNameExist(userName);
    console.log(usernameExist);
    if (!usernameExist.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(userEmail, userPassword);

        // authentication
        // -> email ,password , username

        await createdUserResult.user.updateProfile({
          displayName: userName,
        });
        // firebase user collection (create a document)
        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: userName.toLowerCase(),
          fullName: userFullName.toLowerCase(),
          emailAddress: userEmail.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setUserFullName("");
        setUserEmail("");
        setUserEmail("");
        setUserPassword("");
        setError(error.message);
      }
    }

    // try {
    // } catch (error) {}
  };
  useEffect(() => {
    document.title = "Sign Up - Instagram";
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
          <form method="post" onSubmit={handelSignup}>
            <input
              type="text"
              aria-label="Enter your user name"
              placeholder="User name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => {
                setUserName(target.value);
              }}
              value={userName}
            />
            <input
              type="text"
              aria-label="Enter your full name"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => {
                setUserFullName(target.value);
              }}
              value={userFullName}
            />
            <input
              type="email"
              aria-label="Enter your eamil address"
              placeholder="eamil address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => {
                setUserEmail(target.value);
              }}
              value={userEmail}
            />
            <input
              type="password"
              aria-label="Enter your password"
              placeholder="password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => {
                setUserPassword(target.value);
              }}
              value={userPassword}
            />
            <button
              disabled={isValid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded  h-8 ${
                isValid && "opacity-50"
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded">
          <p className="text-sm">
            Have an account?{``}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
