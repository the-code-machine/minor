'use client'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function page() {
  const user = useSelector((state)=>state.auth)
  useEffect(()=>{
    console.log(user)
  },[user])
  return (
    <div>page</div>
  )
}

export default page