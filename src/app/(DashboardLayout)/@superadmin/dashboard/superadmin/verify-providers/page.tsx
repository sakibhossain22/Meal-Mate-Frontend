import { getAllProvidersProfilesAction } from '@/actions/superadmin.action'
import VerifyDeliveryMan from '@/components/dashboard/VerifyDeliveryMan'
import React from 'react'

export default async function  VerifyProviders() {
  const providerProfiles = await getAllProvidersProfilesAction()
  console.log(providerProfiles)
  return <VerifyDeliveryMan title='Provider' deliveryMenProfiles={providerProfiles?.data || []} />
}

