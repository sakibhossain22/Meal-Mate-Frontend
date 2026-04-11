import { getAllDeliveryMenProfilesAction } from '@/actions/superadmin.action'
import VerifyDeliveryMan from '@/components/dashboard/VerifyDeliveryMan'
import React from 'react'

export default async function VerifyDelivery() {
  const deliveryMenProfiles = await getAllDeliveryMenProfilesAction()
  console.log(deliveryMenProfiles)
  return <VerifyDeliveryMan title='Delivery' deliveryMenProfiles={deliveryMenProfiles?.data || []} />
}

