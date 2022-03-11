import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Bugs = () => {
  const [bugs, setBugs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('mounted and doing api call to get bugs')
    getBugs()
  }, [])

  const deleteBug = async (id) => {
    await axios.delete(`/api/bugs/${id}`);
    let filteredBugs = bugs.filter(b => b.id !== id)
    setBugs(filteredBugs)
  };


  const getBugs = async () => {
    try {
      let res = await axios.get('/api/bugs')
      setBugs(res.data)
      console.log(res)
    } catch (err) {
      console.log('error')
    }
  }

  const renderBugs = () => {
    return bugs.map(b => {
      return (
        <div key={b.id} className='border'>
          <h2>Name: {b.name}</h2>
          <p>Type: {b.bug_type}</p>
          <p>ID: {b.id}</p>
          <button onClick={() => deleteBug(b.id)}>Delete</button>
        </div>
      )
    })
  }

  return (
    <div className='border'>
      <h1>Bugs Page</h1>
      <button onClick={() => navigate('/bugs/new')}>New</button>
      <div>{renderBugs()}</div>
    </div>
  )
}

export default Bugs