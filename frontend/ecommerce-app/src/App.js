import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>{/* <Route path="/" exact></Route> */}</Switch>
      </Router>
    </>
  );
}

export default App;
