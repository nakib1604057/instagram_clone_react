import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from "./contexts/user";
import ProtectedRoute from "./helpers/protected-route";
import IsUserLoggedIn from "./helpers/is-user-logged-in";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/Notfound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loding....</p>}>
          <Switch>
            <IsUserLoggedIn
              user={user}
              loggedInPath={ROUTES.DASHBOARD}
              path={ROUTES.LOGIN}
            >
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn
              user={user}
              loggedInPath={ROUTES.DASHBOARD}
              path={ROUTES.SIGN_UP}
            >
              <SignUp />
            </IsUserLoggedIn>
            {/* <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} /> */}

            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={ROUTES.PROFILE} exact>
              <Profile />
            </ProtectedRoute>

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
