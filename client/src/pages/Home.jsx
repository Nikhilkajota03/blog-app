import React, { useContext, useEffect, useState } from "react";
import HomePosts from "../Components/HomePosts";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Loader from '../Components/Loader'
import { UserContext } from "../context/UserContext";

const Home = () => {
  const [loader, setloader] = useState(false);

  const [posts, setPosts] = useState([]);

  const [noresult, setNoresult] = useState(false);

  const {user} = useContext(UserContext);
  // console.log(user);

  const { search } = useLocation();
  // console.log(search);

  const fetchPosts = async () => {
    setloader(true);

    try {
      const res = await axios.get("http://localhost:5000/api/posts/" + search);
      setPosts(res.data);

      if (res.data.length == 0) {
        setNoresult(true);
      }

      setloader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);



  return (
    
    <>
    <Navbar/>
<div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noresult?
        posts.map((post)=>(
          <>
          <Link to={user?`/posts/post/${post._id}`:"/login"}>
          <HomePosts key={post._id} post={post}/>
          </Link>
          </>
          
        )):<h3 className="text-center font-bold mt-16">No posts available</h3>}
    </div>
    <Footer/>
    </>
    
  )
}

export default Home