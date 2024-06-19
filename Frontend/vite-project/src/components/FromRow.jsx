const Fromrow=({type,name,value,handlechange,labeltext})=>{
return(
<div className="form-row">
<label htmlFor="{name}"className="form-label">
    {labeltext||name}
</label>
<input
 type={type}
 value={value}
 name={name}
 onChange={handlechange}
 className="form-input"
 >
</input>
</div>
)}
export default Fromrow