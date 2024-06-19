import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { useAppContext } from '../context/appcontext'
import Wrapper from '../assets/wrapper/PageBtnContainer'
const PageBtnContainer=()=>{
    const {numofPages,page,changepage}=useAppContext()
    const pages=Array.from({length:numofPages},(_,index)=>{
        return index+1;
    })
    const nextpage=()=>{
        
            let newpage=page+1
            if(newpage>numofPages){
                newpage=1
            }

            changepage(newpage);
    }
        const prevpage=()=>{
            let newpage=page-1
            if(newpage<1){
                newpage=numofPages
            }
            changepage(newpage);
        }
        return (
            <Wrapper>
              <button className='prev-btn' onClick={prevPage}>
                <HiChevronDoubleLeft />
                prev
              </button>
              <div className='btn-container'>
                {pages.map((pageNumber) => {
                  return (
                    <button
                      type='button'
                      className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
                      key={pageNumber}
                      onClick={() => changePage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  )
                })}
              </div>
              <button className='next-btn' onClick={nextPage}>
                next
                <HiChevronDoubleRight />
              </button>
            </Wrapper>
          )}