import { useState } from 'react'
import PostsList from './components/PostsList'
import PostsProvider from './components/Context/PostsContext'

function App() {

  return (
    <PostsProvider>
      <PostsList />
    </PostsProvider>
  )
}

export default App
