import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';

export default function Admin({isLoggedIn}) {

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

    useEffect(() => {
      if(!isLoggedIn || role !== "Admin") {
        navigate("/")
      }
    
    }, [role, isLoggedIn])

  return (
    <div className="content">
      Admin

    </div>
  )
}

