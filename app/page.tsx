'use client'
import { SignOutButton, useAuth } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  const {isSignedIn} = useAuth();
  return (
    <div>
      {isSignedIn ? <div><SignOutButton/></div> : <div>Go to signin</div>}
    </div>
  )
}

export default Page