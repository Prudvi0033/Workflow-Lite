'use client'

import { SignOutButton, useAuth } from '@clerk/nextjs'
import React from 'react'

const WorkflowPage = () => {
    const {isSignedIn} = useAuth()
  return (
    <div>
        {isSignedIn && <SignOutButton redirectUrl='/' />}
    </div>
  )
}

export default WorkflowPage