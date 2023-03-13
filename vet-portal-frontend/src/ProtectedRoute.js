import { Navigate } from "react-router-dom";


function ProtectedRoute({user, token, children}){
    if(!user && !token && token!=="" &&token!== undefined){
        return <Navigate to='/login' replace />;
    }
    return children;
}

export default ProtectedRoute;