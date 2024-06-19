import links from "../utils/links";
import { NavLink } from 'react-router-dom';
const NavLink=({toglesidebar})=>{
    return(
        <div className="nav-links">
            {links.map((link)=>{
                const {text,path,id,icon}=link;
                return(
                    <NavLink 
                    to={path}
                    key={id}
                    onclick={toglesidebar}
                    className={({isActive})=>
                    isActive?'nav-link active':'nav-link'
                }
                    end
                    >
   <span className='icon'>{icon}</span>
                    </NavLink>
                )
            })}
        </div>
    )
}