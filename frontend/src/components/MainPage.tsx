import { useNavigate } from "react-router-dom";
import {useEffect} from 'react';
import { useAppDispatch, useAppSelector } from "../hoocs/hoocs";
import { getAllPost } from "../redux/reducers/postSlice";
import PostComponent from "../pages/PostComponent";
import { Post } from "../types/types";
import '../styles/Post.css';
import AddPost from "./AddPost";

const MainPage = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {posts, isLoading} = useAppSelector(state => state.postSlice);

  useEffect(() => {
    dispatch(getAllPost())
  }, [dispatch])

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])
  
  return (
    <div>
      <AddPost />
      {posts.map((post: Post) => (
        <div className="post_container" key={post._id}>
          <PostComponent 
          likes={post.likes}
          _id={post._id}
          username={post.username}
          title={post.title}
          text={post.text}
          imgUrl={post.imgUrl}
          views={post.views}
          author={post.author}
          comments={post.comments}
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}/>
        </div>
      ))}
      {isLoading ? <p>Loading</p> : ''}
    </div>
  )
}

export default MainPage
