import  {Link} from"react-router-dom"
import { Navigate } from "react-router-dom"
import { useAppContext } from "../context/appcontext"
import React from "react"
import Wrapper from "../assets/wrapper/LandingPage"

const Landing=()=>{
    const {user}=useAppContext()
    return(
        <React.Fragment>
            {user && <Navigate to="/"/>}
            <Wrapper>
                <nav>
                    <Logo />
                </nav>
                <div className="info">
                    <h1>
                        Job<span>tracking</span>app
                    </h1>
                    <p>
                        HELLO WELCOME
                    </p>
                    <Link to="/register" className="btn btn-hero">
                    Login/Register
                    </Link>
                </div>
            </Wrapper>
        </React.Fragment>
    )
}
export default Landing;