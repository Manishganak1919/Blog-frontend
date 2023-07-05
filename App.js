import "./App.css";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./components/account/Login";
import DataProvider from "./context/DataProvider";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import CreatePost from "./create/CreatePost";
import DetailsView from "./components/details/DetailsView";

const PrivateRoute = ({isAuthenticated, ...props}) => {
  return isAuthenticated ? 
    <>
      <Header />
      <Outlet />
    </>
  : 
    <Navigate replace to="/login" />
  
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: "30px" }}>
          <Routes>
            <Route
              path="/login"
              element={<Login isUserAuthenticated={isUserAuthenticated} />}
            />
            <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route path="/create" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path="/create" element={<CreatePost/>} />
            </Route>

            <Route path="/details/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path="/details/:id" element={<DetailsView/>} />
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}
/***Here, Home component is below the login component , but we want to , not showing in login component , we shuold doing routing***/
/*** needs to install react-router-dom***/
export default App;
