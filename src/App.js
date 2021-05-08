import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from "./contexts/user";
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/Notfound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loding....</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.DASHBOARD} component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
