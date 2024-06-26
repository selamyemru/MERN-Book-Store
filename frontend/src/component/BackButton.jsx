// import React from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
function BackButton() {
  return (
    <div>
      ,<Link to={'/'}>< BsArrowLeft size={30} width={32}/></Link>
    </div>
  )
}
export default BackButton
