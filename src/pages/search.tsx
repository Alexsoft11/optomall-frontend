import GoToBack from '@/components/GoToBack'
import Search from '@/features/Search/components/Search'
import React from 'react'

const searchPage = () => {
  return (
    <>
        <div className='container'>
            <GoToBack pathArr={[{ title: "results", path: "search" }]} />
        </div>
        <Search/>
    </>
  )
}

export default searchPage