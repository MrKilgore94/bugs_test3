import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Bug from "./Bug";

const Bugs = () => {
  const [bugs, setBugs] = useState([]); //bugs state and setter to set it
  const navigate = useNavigate(); //used for navigate in button at bottom

  useEffect(() => { //have a useEffect so i get the bugs on mount
    console.log('mounted and doing api call to get bugs')
    getBugs()
  }, [])

  // const addBug = ()=>{
  //   //axios call here
  //   //update state/UI  (this is how we did it last week) but instead use mount and api call
  // }

  const deleteBug = async (id) => {
    await axios.delete(`/api/bugs/${id}`);
    //can update UI at this point 
    let filteredBugs = bugs.filter(b => b.id !== id)
    setBugs(filteredBugs) //go through each bug, if bug id i'm currently looking at does not equal 
  };                      //id given to the function, keep it; puts all bugs that don't match id in a new array

  const getBugs = async () => {
    try {
      let res = await axios.get('/api/bugs') //does my axios call, set bugs(res.data)
      setBugs(res.data)                   //error handling is a bonus but good for debugging
      console.log(res)
    } catch (err) {
      console.log('error')
    }
  }

  const renderBugs = () => {   
    return bugs.map(b => {     //return bugs state. map and go thrugh each bug and
      return <Bug key={b.id} {...b} //return that bug component we just created and give it a key, bug.id
    deleteBug={deleteBug} />
    })                                //since bug is an object, can spread out over it
  }
  return (
    <div className='border'>
      <h1>Bugs Page</h1>
      <button onClick={() => navigate('/bugs/new')}>New</button>
      <div>
          {renderBugs()
      }</div>
      {/* <p>{JSON.stringify(bugs)}</p> */}
    </div>
  )
}

export default Bugs


