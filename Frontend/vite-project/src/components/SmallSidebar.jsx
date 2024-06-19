import { FaTimes } from 'react-icons/fa'
import Wrapper from '../assets/wrapper/SmallSidebar'
import { useAppContext } from '../context/appcontext'
  import Logo from "./Logo"
  import NavLinks from './NavLinks'
  const SmallSidebar=()=>{
    const {showSidebar,togglesidebar}=useAppContext()
    return(
        <Wrapper>
        <div
          className={
            showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
          }
        >
          <div className='content'>
            <button type='button' className='close-btn' onClick={toggleSidebar}>
              <FaTimes />
            </button>
            <header>
              <Logo />
            </header>
            <NavLinks toggleSidebar={toggleSidebar} />
          </div>
        </div>
      </Wrapper>
    )
  }
