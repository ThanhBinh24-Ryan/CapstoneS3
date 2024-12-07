import React from 'react'
import { Outlet } from "react-router-dom";
import IndexHeader from './components/HeaderUser/IndexHeader'
import IndexFooter from './components/FooterUser/IndexFooter'
export default function IndexUser() {
  return (
    <div>
      <IndexHeader/>
      <Outlet/>
      <IndexFooter/>
    </div>
  )
}
