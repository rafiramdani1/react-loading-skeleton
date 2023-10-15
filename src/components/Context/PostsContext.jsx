import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const PostsContext = createContext()

const PostsProvider = ({ children }) => {

  const [originalPosts, setOriginalPosts] = useState([])
  const [posts, setPosts] = useState([])
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGetPosts()
  }, [])

  const fetchGetPosts = async () => {
    setLoading(true)
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setPosts(response.data)
      setOriginalPosts(response.data)
    } catch (error) {
      console.error(error.response)
    } finally {
      setLoading(false)
    }
  }

  const setPostsByUserId = async (id) => {
    if (id == 'allposts') {
      setUserId('')
      await fetchGetPosts();
    } else {
      setLoading(true);
      return new Promise((resolve) => {
        setTimeout(() => {
          try {
            const postsUser = originalPosts.filter((post) => post.userId == id);
            setUserId(postsUser[0].userId)
            setPosts(postsUser);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
            resolve()
          }
        }, 1000); // Contoh: Simulasi jeda 1 detik untuk skeleton sebelum pemrosesan selesai.
      });
    }
  }

  return (
    <PostsContext.Provider value={{ posts, loading, setPostsByUserId, userId }}>
      {children}
    </PostsContext.Provider>
  )
}

export default PostsProvider