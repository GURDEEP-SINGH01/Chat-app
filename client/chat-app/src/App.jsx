import { Layout } from "./component/Layout";
import './App.css'
import { Signin } from "./component/Authentication/Signin";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Signup } from "./component/Authentication/Signup/Signup";
export const App = () => {
  const [loggedUser, setLoggedUser] = useState(null)
  const [userList, setUserList] = useState([]);

  return (
    <div className="width-fl height-fl" >
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/signin" />} />
            <Route exact
              path="/signin"
              element={
                <Signin
                  loggedUser={loggedUser}
                  setLoggedUser={setLoggedUser} />
              } />
            <Route exact
              path="/signup"
              element={
                <Signup />
              } />
            <Route exact
              path='/layout'
              element={
                <Layout
                  userList={userList}
                  setUserList={setUserList}
                  loggedUser={loggedUser}
                  setLoggedUser={setLoggedUser} />
              } />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

