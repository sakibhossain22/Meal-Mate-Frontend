import { adminAllUser } from '@/actions/meal.action'
import ManageUsers from '@/components/dashboard/AllUsers'
import React from 'react'

export default async function  ManageUser() {
  const AllUsers = await adminAllUser() 
  console.log(AllUsers)
  return <ManageUsers allUsers={AllUsers?.data} />
}

