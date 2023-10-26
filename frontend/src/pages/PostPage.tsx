import { Link, useNavigate, useParams } from "react-router-dom";
import { Comment, Post } from "../types/types";
import { useAppDispatch, useAppSelector } from "../hoocs/hoocs";
import '../styles/postdetailed.css';
import { likePost, removePost } from "../redux/reducers/postSlice";
import {useCallback, useEffect, useState} from 'react';
import { createComment, getAllComments } from "../redux/reducers/commentsSlice";
import CommentItem from "../components/CommentItem";
import { getAllUsers } from "../redux/reducers/authSlice";

const PostPage = () => {
  const [comment, setComment] = useState('');

  const { id } = useParams<{ id: string }>();
  const posts = useAppSelector((state) => state.postSlice.posts)
  const post: Post | undefined | null = posts.find((p) => p._id === id);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.user);
  const navigate = useNavigate();
  const params = useParams();

  const comments: Comment[] = useAppSelector((state) => state.commentSlice.comments);

  const handleLike = (postId: string) => {
    const liked = post?.likes.some((like: any) => like.userId === user?.id);
    if (liked) {
      dispatch(likePost(postId));
    } else {
      dispatch(likePost(postId));
    }
  }

  const removeUserPost = () => {
    try {
      if (post) {
        dispatch(removePost(post._id))
        navigate('/')
      }
    } catch (e) {
      console.log(e)
    }
  }


  if (!post) {
    return (
      <div>
        Post not found.
        <Link to="/">Go back</Link>
      </div>
    );
  }

  const handleSubmit = () => {
    try {
      const postId: any = params.id;
      const userId: any = user?._id || null;
      dispatch(createComment({ postId, comment, userId }));
      setComment('');
    } catch (e) {
      console.log(e)
    }
  }

  const fetchComments = useCallback(async() => {
    try {
      dispatch(getAllComments(params.id))
    } catch (e) {
      console.log(e)
    }
  }, [params.id, dispatch])


  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  useEffect(() => {
    dispatch(getAllUsers());
}, []);

  return (
    <div className="post_detailed_info">
      <h2>{post.title}</h2>
      <div className="post_line"></div>
      <Link className="back" to='/'>Назад</Link>

      {user?._id === post.author ? (
        <button className="removepost" onClick={removeUserPost}>Удалить пост</button>
      ) : (
        <p className="you_are_not">Вы не создатель поста</p>
      )}

      <div className="post_img_container">
        {post.imgUrl && <img className="post_img" src={`http://localhost:5001/${post.imgUrl}`} alt="Post Image" />}
      </div>

      <p>{post.text}</p>
      <div className="authorpost"><p>By</p> <Link className="authorpost" to={`/user/${post.author}`}>{post.username}</Link></div>
      

      <div className="post_line"></div>

      <div className="post_text">
        <div className="post_sub_text">
          <div className="post_info">
            <p onClick={() => handleLike(post._id)} className="post_info_part">Likes: {post.likes ? post.likes.length : 0}</p>
            <p className="post_info_part">Comments: {post.comments.length}</p>
          </div>
        </div>
        <p>{new Date(post.createdAt).toLocaleString()}</p>
      </div>

      <div className="post_line"></div>
      <div className="comments">
        <h3>Оставить комментарий</h3>
        <form className="comment_form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" className="commentpost" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
          <button type="submit" className="commentpost_but" onClick={handleSubmit}>Создать пост</button>
        </form>
      </div>
      
      <div>
      {comments?.map((cmt: Comment) => (
        <div className="comment_section" key={cmt._id}>
          <CommentItem cmt={cmt} />
        </div>
      ))}
      </div>

    </div>
  );
};

export default PostPage;