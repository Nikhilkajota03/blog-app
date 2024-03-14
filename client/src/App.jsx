import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Route,Routes } from 'react-router-dom'
import PostDetails from './pages/postDetails'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Profile from './pages/profile'
import { UserContextProvider } from './context/userContext'
import MyBlogs from './pages/MyBlogs'

const App = () => {
  return (
    <div>
      <UserContextProvider>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/posts/post/:id" element={<PostDetails/>}/>
          <Route path="/write" element={<CreatePost/>}/>
          <Route path="/edit/:id" element={<EditPost/>}/>
          <Route path="/myblogs/:id" element={<MyBlogs/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
        </Routes>
      </UserContextProvider>
    
    </div>
  )
}

export default App
