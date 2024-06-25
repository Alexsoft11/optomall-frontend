import { AccountInfo } from '@/features/Account'
import useQueryApiClient from '@/utils/useQueryApiClient';
import React, { useState } from 'react'

const AccountPage = () => {
  const [user, setUser] = useState()
  const { appendData: getSlidersData } = useQueryApiClient({
    request: {
      url: 'user-get-data',
      method: 'GET',
    },
    onSuccess(res) {
      console.log(res)
      setUser(res)
    }
  });


  return (
    <div className='container'>
     <AccountInfo user={user}/>
    </div>
  )
}

export default AccountPage