import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import FirebaseContext from "../contexts/firebase";

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const invalid = userEmail === "" || userPassword === "";
  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);
  return (
    <div>
      <p>
        <h1 className="text-4xl font-bold">Hello</h1>I am login page
      </p>
    </div>
  );
};

export default Login;
