import { useContext } from "react";
import firebaseContext from "../contexts/firebase";
import userContext from "../contexts/user";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
const Header = () => {
  const { firebase } = useContext(firebaseContext);
  const { user } = useContext(userContext);
  // console.log("user", user);
  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-6">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex item-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD}>
                <img
                  src="/images/logo.png"
                  alt="instagram"
                  className="mt-4 w-6/12 "
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => firebase.auth().signOut()}
                  onKeyDown={(event) => {
                    if (event.key == "Enter") {
                      firebase.auth().signOut();
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-4 ml-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.displayName}`}>
                    <img
                      src={`images/avatars/karl.jpg`}
                      alt=""
                      className="rounded-full h-8 w-8 flex"
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="ml-5 bg-blue-medium py-2 px-3 border border-gray-primary rounded-md shadow-sm text-sm leading-4 font-medium text-white "
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    className="ml-5 bg-white py-2 px-3 border border-blue-medium rounded-md shadow-sm text-sm leading-4 font-medium text-blue-medium "
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
