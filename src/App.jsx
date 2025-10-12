import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Meetings from './pages/Meetings/Meetings';
import ApplyNow from './pages/ApplyNow/ApplyNow';
// import Courses from './pages/Courses/Courses';


function App() {
  return (
    <div>
      

      <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path= '/meetings' element = {<Meetings />} />
        <Route path='/apply' element= {<ApplyNow />} />
        {/* <Route path= '/courses' element = {<Courses />} /> */}
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
