import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsManager ( { children } ) {
    
    const { isManager, isLoading } = useContext(AuthContext);
    
    if (isLoading) return <p>Loading ...</p>;
 

    if (!isManager) {

    return <Navigate to="/" />;
  } else {

    return children;
  }
}


export default IsManager;

