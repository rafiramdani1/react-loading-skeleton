import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonCard = () => {
  return (
    [...Array(10).keys()].map(i => (
      <div className='border rounded-md border-neutral-300 mb-3 p-3' key={i}>
        <Skeleton width={'50%'} className='mb-3' />
        <Skeleton count={3} height={10} />
      </div>
    ))
  )
}

export default SkeletonCard