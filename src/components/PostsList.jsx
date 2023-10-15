import React, { useState, useEffect, useContext } from 'react'
import SkeletonCard from './SkeletonCard'
import { PostsContext } from './Context/PostsContext'
import UsersList from './UsersList'
import axios from 'axios'

const PostsList = () => {

  const { posts, loading, userId } = useContext(PostsContext)
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchGetUsers()
  }, [])

  const fetchGetUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      setUsers(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  let author = ''
  if (userId) {
    const name = users.find(user => user.id == userId).name
    author = `Posts By ${name}`
  }

  return (
    <section className='px-4'>
      <h1 className='text-xl font-medium my-4'>{author || 'All Posts'}</h1>

      <UsersList users={users} />

      {loading ?
        <SkeletonCard />
        :
        posts?.map(post => (
          <div className='border rounded-md border-neutral-400 mb-3 p-3' key={post.id}>
            <h1 className='text-neutral-800 font-medium text-base'>{post.title}</h1>
            <p className='mt-1 text-sm'>{post.body}</p>
            <p className='mt-1 text-sm'>Author : {users?.find(user => user.id === post.userId)?.name}</p>
          </div>
        ))
      }

    </section>
  )
}

export default PostsList