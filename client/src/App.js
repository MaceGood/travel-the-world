import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./pages/Auth/Auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import { useState, useEffect } from "react";
import Loading from "./pages/Loading/Loading";
import NotFound from "./pages/404/404";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, [loading]);

  return (
    <div className="app">
      {loading === false ? (
        <Router>
          <Navbar />
          <Switch>
            <Route path="/auth" exact component={Auth} />
            <Route path="/posts" exact component={Home} />
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/404" component={NotFound} />
            <Redirect from="*" to="/404" />
          </Switch>
        </Router>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
