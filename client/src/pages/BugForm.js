import React, {useState} from "react";
import axios from 'axios';
import {useParams, useLocation, useNavigate} from 'react-router-dom'


//useLocation hook allows us to grab the 2nd state(navigate)
const BugForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const [name, setName] = useState(location.state ? location.state.name : '');
  const [bug_type, set_bug_type] = useState(location.state ? location.state.bug_type : '');
  
  
  //don't want page to reload so prevent default.
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      if (params.id) {  //testing, do i have a params id? 
   //if we have an id, we want to update
  //axios update here and then navigate back to bugs page 
  //update bug to DB 
    //if i have an id, do the put
          await axios.put(`/api/bugs/${params.id}`, {
        name, 
        bug_type, 
        id:params.id,
      });
      } else { //if i dont have an id, do the post 
          await axios.post(`/api/bugs/`, {name, bug_type})
      }
  //when bug has been update, navigate to bugs page which calls the useEffect, and get bug
      navigate("/bugs");     //api call to update; put path , and send it the data 
      } catch(err){         //don't have to map because nav back to bugs page; every time component mounts, useEffect will be called
        alert('error')
  }                       
};
  return (                   //loc.state it is 'null' in new and not null in update; 
                            //if i have this, i want to use the 'name' if not, just use empty string 
    <div>
      <h1>{params.id ? 'Edit' : 'New'} BugForm</h1> {/* //do i have params id? if i do, it's 'edit', if i don't it's 'new' */}
      
      <form onSubmit={handleSubmit}>
        <p>name</p>
        <input value={name} onChange={(e) => setName(e.target.value)}/>
         <p>bug type</p>
        <input value={bug_type} onChange={(e) => set_bug_type(e.target.value)}/>
        <button>{params.id ? 'Update' : 'Create'}</button>  
       </form>       {/*  //have a button, use id, so if i have an ID then say update on button, if we dont, then create */}

      <p>id: {params.id ? params.id : 'no id'}</p>    
      <p>{JSON.stringify(location.state)}</p> {/* //if it an edit, location.state is the value we need, 
                                                  if it's a new bug, loation.state is just null */}
    </div>
  )
}

export default BugForm