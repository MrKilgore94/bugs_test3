import React from "react";
import {useNavigate, Link} from 'react-router-dom'

const Bug = (props) => {
  const navigate = useNavigate()
  const {name, id, bug_type, deleteBug} = props
  return (
      <div className='border'>
          <p>id: {id}</p>
          <p>name: {name}</p>
          <p> bug_type: {bug_type}</p> 
          <Link to={`/bugs/${id}`}>show</Link>
          <button onClick={()=> deleteBug(id)}>delete</button>
          <button onClick={()=>navigate(`/bugs/${id}/edit`, {state: {name, id, bug_type}})}>edit</button>
      </div>
  )
}

export default Bug

//pass state on navigate, can pass it a 2nd arg
//which is an obj with the key state: {name, id, bug_type} pass the stuff
//down to the edit form, this is how we pre-populate the form
//or we can do it through api. either way works. 