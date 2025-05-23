
import {Redirect,Route} from "react-router-dom";

import Cookies from "js-cookie";


const ProtectedRoute =props=>{
    const jwtToken = Cookies.get("jwtOritso");
    if(jwtToken===undefined){
        return <Redirect to="/login"/>
    }
    return <Route {...props}/>


}

export default ProtectedRoute;