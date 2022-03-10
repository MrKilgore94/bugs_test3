import React, {useEffect, useState} from "react";
import axios from 'axios'; 
import {Link, useNavigate} from 'react-router-dom';

 const Bugs = (props) => {
  const {name, id, bug_type} = props; 
  const [bugs, setBugs] = useState([]); 
  const navigate = useNavigate(); 

useEffect(()=> {
  console.log('mounted and doing api call to get bugs')
  getBugs()
}, [])

const deleteBug = async (id) => {
  await axios.delete(`/api/bugs/${id}`); 
  let filteredBugs = bugs.filter(b => b.id !== id)
  setBugs(filteredBugs)
};


const getBugs = async() => {
  let res = await axios.get('/api/bugs')
  setBugs(res.data)
}

const renderBugs =() => {
  return bugs.map(b => {
    return ( 
      <div key={b.id} {...b} >
  
      </div>
    )
  })
}
  
  return (
    //  <div className= 'border'>
    //         <h1>Bugs</h1>
    //          {/* <button onClick={()=>navigate('/bugs/new')}>new</button>  */}
    //         <div className= 'border'>
    //             {renderBugs()}
    //         </div>
    //         <p>{JSON.stringify(bugs)}</p>
    //     </div>
        <div className="border">
      <h1 style={{fontSize:'46px'}}>Bug</h1>
      {renderBugs()}
      <p>id: {props.id}</p>
      <p>name: {name}</p>
      <p>bug_type: {bug_type}</p>
      <Link to={`/bugs/${id}`}>show</Link>
      {/* <button onClick={() => deleteBug(id)}>delete</button> */}
      <button
        onClick={() =>
          navigate(`/bugs/${id}/edit`, { state: { name, id, bug_type } })
        }
      >
        edit
      </button>

    </div>
  
  )
}

export default Bugs