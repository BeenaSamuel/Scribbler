import Navbar from "./Navbar"
import Home from "./pages/Home"

import { Route, Routes } from "react-router-dom"
import Poem from "./pages/Poem"
import Articles from "./pages/articles"
import Shortstory from "./pages/shortstory"
import Publish from "./pages/Publish";
import Feedback from "./pages/Feedback";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";  
import MyProfile from "./pages/MyProfile";
import DeleteContent from "./pages/DeleteContent";
function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };
 
  return (
    <>
       <Navbar isSignedIn={isSignedIn} />
     
      <div className="container">
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/Publish" element={<Publish />} />
          <Route path="/Poem" element={<Poem/>} />
          <Route path="/ShortStory" element={<Shortstory />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/MyProfile" element={<MyProfile />} />
          <Route path="/DeleteContent" element={<DeleteContent />} />
          

          
          
          
        </Routes>
        {isSignedIn ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <SignIn onSignIn={handleSignIn} />
      )}
      
      </div>

      
    </>
  )
}

export default App
