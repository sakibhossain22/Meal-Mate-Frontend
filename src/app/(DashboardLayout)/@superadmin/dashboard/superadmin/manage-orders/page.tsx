import { getAllOrdersAction } from '@/actions/superadmin.action'
import ManageOrder from '@/components/dashboard/manageOrder'
import React from 'react'

export default async function  ManageOrders() {
  const orders = await getAllOrdersAction()
  console.log(orders)
  return <ManageOrder orders={orders?.data} />
}

