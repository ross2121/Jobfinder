import { Outlet } from 'react-router-dom'
import Wrapper from '../assets/wrapper/SharedLayout'
import { Navbar,BigSidebar,Smallsidebar } from '../components'
const SharedLayout=()=>{
    return(
        <Wrapper>
            <main className='dashboad'>
                <Smallsidebar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className='dashboard-page'>
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    )
}
export default SharedLayout