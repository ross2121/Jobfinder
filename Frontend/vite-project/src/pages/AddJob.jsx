import { Fromrow,FormRowSelect,Alert } from "../components";
import { useAppContext } from "../context/appcontext";
import Wrapper from "../assets/wrapper/DashboardFormPage";
const AddJob=()=>{
    const{ isLoading,
        isEditing,
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        handleChange,
        clearValues,
        createJob,
        editJob,}=useAppContext()
        const handleSubmit=(e)=>{
            e.preventDefault();
            if(!position||!company||!jobLocation){
                displayAlert()
                return
            }
            if(isEditing){
                editJob()
                return
            }
            createJob()
        }
        const handleJobInput=(e)=>{
            const name=e.target.name
            const value=e.target.value
            handleChange({name,value})
        }
        return(<Wrapper>
            <form className="for">
                <h3>{isEditing?'edit job':'add job'}</h3>
                {showAlert && <Alert></Alert>}
                <div className="form-center">
                    <Fromrow
                     type={"text"}
                     name="position"
                     value={position}
                         handlechange={handleJobInput}
                    ></Fromrow>
                    <Fromrow
                    type="text"
                    name="company"
                    value={company}
                    handlechange={handleJobInput}
                    ></Fromrow>
                    <Fromrow >
                     type:"text"
                     name:"company"
                     value:{company}
                     handleChange={handleJobInput}
                    </Fromrow>
                    <FormRowSelect name="status"
                    value={status}
                    handlechange={handleJobInput}
                    list={statusOptions}></FormRowSelect>
                    <FormRowSelect 
                    name="jobtype"
                    labelText="job type"
                    value={jobType}
                    handlechange={handleJobInput}
                    list={jobTypeOptions}
                    ></FormRowSelect>
                    <div className="btn containe">
                        <button 
                        type="submit"
                        className="btn btn-block submit-btn"
                        onClick={handleSubmit}
                        disabled={isLoading}>
                            SUBMIT
                        </button>
                        <button className="btn btn-block submit-btn"
                        onClick={(e)=>{
                            e.preventDefault()
                            clearValues()
                        }}
                       >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>)
}
export default AddJob