import {Route,Switch,useLocation} from "react-router-dom";


import Home from "./components/home";
import Login from "./components/login";
import ProtectedRoute from "./components/protectedRoute";

import './App.css';
import Tasks from "./components/tasks";
import AddTask from "./components/addTask";
import EditTask from "./components/editTask";
import Navbar from "./components/navbar";
import Profile from "./components/profile";
import Footer from "./components/footer";

import "./App.css";

function App() {

  const location=useLocation();
  return (
    <div className="all-bg">
     {location.pathname !=="/login"&& <Navbar/> } 

    <div className="main-container">
    <Switch>
   
      <ProtectedRoute exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <ProtectedRoute exact path="/tasks" component={Tasks}/>
      <ProtectedRoute exact path="/addTask" component={AddTask}/>
      <ProtectedRoute exact path="/editTask/:id" component={EditTask}/>
      <ProtectedRoute exact path="/profile" component={Profile}/>
    </Switch>
    </div>
    {location.pathname !=="/login"&&<Footer/>}
    </div>
  );
}

export default App;
