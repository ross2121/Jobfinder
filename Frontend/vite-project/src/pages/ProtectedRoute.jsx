import { useAppContext } from "../context/appcontext";
import { Navigate } from "react-router-dom";
import { Loading } from "../components";
const ProtectedRoute=({children})=>{
    const {user,userLoading}=useAppContext();
    if(userLoading)return<Loading />
    if(!user){
        return <Navigate to="/landing"></Navigate>
    }
    return children;
}
export default ProtectedRoute