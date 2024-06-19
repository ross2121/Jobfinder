import { useAppContext } from "../context/appcontext";
import StatsItem from "./StatItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from "../assets/wrapper/StatsContainer";
const StatsContainer=()=>{
    const {stats}=useAppContext();
    const defaultStats=[
        { title:'pending application',
            count:stats.pending||0,
            icon:<FaSuitcaseRolling />,
            color: '#e9b949',
            bcg: '#fcefc7',
        },
        {
            title: 'interviews scheduled',
            count: stats.interview || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8f9',
          },
          {
            title: 'jobs declined',
            count: stats.declined || 0,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg: '#ffeeee',
          },]
          return (
            <Wrapper>
              {defaultStats.map((item, index) => {
                return <StatsItem key={index} {...item} />
              })}
            </Wrapper>
          )
    
}
export default StatsContainer
