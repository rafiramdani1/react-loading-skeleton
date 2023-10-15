import React from 'react'
import { useContext } from 'react'
import { PostsContext } from './Context/PostsContext'

const UsersList = ({ users }) => {

  const { setPostsByUserId } = useContext(PostsContext)

  const handleChangeUserId = e => {
    const id = e.target.value
    setPostsByUserId(id)
  }

  return (
    <div className='mb-3'>
      <select
        className='border rounded-md px-4 py-1 w-fit'
        onChange={handleChangeUserId}
      >
        <option value={'allposts'}>All posts</option>
        {users?.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
    </div>
  )
}

export default UsersList