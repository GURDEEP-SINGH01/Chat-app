import { Layout } from "./component/Layout";
import './App.css'
import { Signin } from "./component/Authentication/Signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export const App = () => {
  const [loggedUser, setLoggedUser] = useState(null)
  const [userList, setUserList] = useState([]);


  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('http://localhost:9000/chatapp/allUsers');
        if (response.status === 200) {
          const data = response.data;
          console.log(response.data)
          setUserList(data);
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    getUsers();
  }, [])


  return (
    <div className="width-fl height-fl" >
      <Router>
        <div>
          <Routes>
            <Route exact
              path="/"
              element={
                <Signin
                  loggedUser={loggedUser}
                  setLoggedUser={setLoggedUser} />
              } />
            <Route exact
              path='/layout'
              element={
                <Layout
                  userList={userList}
                  loggedUser={loggedUser} />
              } />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

