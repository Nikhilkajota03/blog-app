import React, { useContext, useEffect, useState } from 'react'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from '../Components/ProfilePosts';
import { UserContext } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Navigate , useNavigate } from "react-router-dom";



const Profile = () => {

  const userid = useParams().id

  const navigate = useNavigate(); 

   const[username ,setusername]=useState();
   const[email,setEmail] = useState();
   const[password,setPassword] = useState();
   const [updated,setUpdated]=useState(false)
   const [posts,setPosts]=useState([])

   const {user,setUser}=useContext(UserContext)

  
   
   const handleUpdate = async (e)=>{
    
    e.preventDefault();
    setUpdated(false)
      try {
              const res = await axios.put("http://localhost:5000/api/users/" + user._id, {username:username,email:email,password:password},{withCredentials:true});
              setUpdated(true)

      } catch (error) {
                         console.log(error);
                         setUpdated(false);
      }
  }


   const fetchuser = async  ()=>{
   
      try {
              const res = await axios.get("http://localhost:5000/api/users/" + user._id);
              console.log(res.data);
              setusername(res.data.username);
              setEmail(res.data.email);
              setPassword(res.data.password);

      } catch (error) {
              console.log(error);
      }
   }

    useEffect(()=>{
       fetchuser();
    },[userid])






    const handleUserdelete =  () =>{
        
      try {
                axios.delete("http://localhost:5000/api/users/" + user._id,{withCredentials:true})
                setUser(null)
                navigate('/')
                

      } catch (error) {
          console.log(error)
      }

    }

    const fetchUserPosts=async ()=>{
      try{
        const res=await axios.get("http://localhost:5000/api/posts/user/"+user._id)
        console.log(res.data)
        setPosts(res.data)
      }
      catch(err){
        console.log(err)
      }
    }

    useEffect(()=>{
      fetchUserPosts();
   },[userid])


    return (
        <div>
          <Navbar/>
          <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
            <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
              <h1 className="text-xl font-bold mb-4">Your posts:</h1>

               {posts?.map((p)=>(
                    <ProfilePosts key={p._id} p={p}/>
                ))}


            </div>


            <div className="md:sticky md:top-12  flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
            <div className=" flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>

              <input onChange={(e)=> setusername(e.target.value)}  value={username}className="outline-none px-4 py-2 text-gray-500" placeholder="Your username" type="text"/>
              <input  onChange={(e)=> setEmail(e.target.value)}    value={email} className="outline-none px-4 py-2 text-gray-500" placeholder="Your email" type="email"/>

              <input onChange={(e)=>setPassword(e.target.value)} value={password} className="outline-none px-4 py-2 text-gray-500" placeholder="Your password" type="password"/>

              <div className="flex items-center space-x-4 mt-8">
                <button onClick={handleUpdate} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Update</button>
                <button  onClick={handleUserdelete} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Delete</button>
              </div>
              {/* {updated && <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully!</h3>} */}
            </div>

            {updated && <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully!</h3>}

            </div>
          </div>
          <Footer/>
        </div>
      )
    }
    
    export default Profile
