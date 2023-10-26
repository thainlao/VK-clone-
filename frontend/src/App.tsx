import AddPost from "./components/AddPost"
import MainPage from "./components/MainPage"
import PostPage from "./pages/PostPage"
import Posts from "./components/Posts"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Layout from "./pages/Layout";
import {ToastContainer} from 'react-toastify' 
import 'react-toastify/ReactToastify.css'
import { useAppDispatch } from "./hoocs/hoocs";
import { useEffect } from 'react';
import { getMe } from "./redux/reducers/authSlice";
import Navbar from "./pages/Navbar";
import Images from "./components/Communities";
import MyProfile from "./pages/MyProfile";
import AllUsers from "./components/AllUsers";
import UserDetailPage from "./components/UserDetailPage";
import Communities from "./components/Communities";
import GroupDetails from "./pages/GroupDetails";

function App() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return ( 
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/posts" element={<Posts />}/>
          <Route path="/:id" element={<PostPage />}/>
          <Route path="/myprofile" element={<MyProfile />}/>
          <Route path="/allusers" element={<AllUsers />}/>
          <Route path="/navbar" element={<Navbar />}/>
          <Route path="/new" element={<AddPost />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/communities" element={<Communities />}/>
          <Route path="/group/:groupId" element={<GroupDetails />} />
          <Route path="/user/:userId" element={<UserDetailPage />}/>
        </Routes>
      </Router>
      

      <ToastContainer position="bottom-right"></ToastContainer>
    </Layout>
  )
}

export default App
