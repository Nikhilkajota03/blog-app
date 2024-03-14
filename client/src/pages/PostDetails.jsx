import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Loader from "../Components/Loader";
import { Navigate , useNavigate } from "react-router-dom";
import Comment from "../Components/Comment";




const PostDetails = () => {

   const navigate = useNavigate(); 

   const postid = useParams().id;
   const [post , setPosts] = useState({});


   const [comments,setcomments] = useState([]);
   const [comment , setcomment] = useState(""); 


  const [loader , setloader] = useState(false);

  const {user} = useContext(UserContext)



   const fetchdetails = async () => {
        setloader(true);
    try {
      
      const res = await axios.get("http://localhost:5000/api/posts/" + postid);
      console.log(res.data)
      setPosts(res.data);

    } catch (error) {
        console.log(error);
    }
       setloader(false);
   }

   useEffect(()=>{
    fetchdetails();
   },[postid])




  const handledelete = async ()=>{

      try {
            const res =  await axios.delete("http://localhost:5000/api/posts/" + postid, {withCredentials:true} );

            console.log(res);

            navigate('/');


      } catch (error) {
        
      }
  }


   const fetchpost = async ()=>{
       
      try {
               const res = await axios.get("http://localhost:5000/api/comments/post/" + postid);
              console.log(res.data);

              setcomments(res.data);
              

      } catch (error) {
          console.log(error); 
      }
   }

    useEffect(()=>{
       fetchpost();
    },[postid]) 
  

    const addComment = async (e) =>{
        e.preventDefault();
        
        try {
               const res = await axios.post("http://localhost:5000/api/comments/create" , {Comment : comment , author: user.username,postId:postid,userId:user._id  },{withCredentials:true})
                   setcomment(" ");

               window.location.reload(true);

        } catch (error) {
          console.log(error)

        }

    } 

 
    console.log(comments)


  return (
    <div>
      <Navbar />
      {/* <div className="h-[80vh] flex justify-center items-center w-full">
            </div> */}
      { loader ? <div className="h-[80vh] flex justify-center items-center w-full"> <Loader/> </div> :  <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            {post.title}
          </h1>
          

            {user?._id==post?.userId &&
                 <div className="flex items-center justify-center space-x-2">
                   <p className="cursor-pointer" onClick={()=> navigate("/edit/" + postid )}>
                       <BiEdit />
                     </p>
                     <p   onClick={handledelete} className="cursor-pointer">
                       <MdDelete />
                      </p>
                      </div>
            }
    
         
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
          <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
          <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
          </div>
        </div>
        <img
          src={"http://localhost:5000/images/" + post.photo}
          className="w-full  mx-auto mt-8"
          alt=""
        />
        <p className="text-sm md:text-lg break-words">
          {post.desc}
        </p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories</p>
          <div className="flex justify-center items-center space-x-2">
  
           {post.categories?.map((c,i)=>(
                  <div key={i} className="bg-gray-300 rounded-lg px-3 py-1"> {c}</div> 
           ))}
           
           
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>


           {comments?.map((c)=>(
              <Comment key={c._id} c={c} post={post} />
           ))}

          
        </div>
        {/* {write a comment} */}
        <div className="w-full flex flex-col mt-4 md:flex-row">
          <input  onChange={(e)=> setcomment(e.target.value)}
            type="text"
            placeholder="Write a comment"
            className="md:w-80 outline-none py-2 px-4 mt-4 md:mt-0"
          />
          <button onClick={addComment} className="bg-black text-sm text-white px-2 py-2 md:w-20 mt-4 md:mt-0">
            Add Comment
          </button>
        </div>
      </div>}
      <Footer />
    </div>
  );
};

export default PostDetails;
