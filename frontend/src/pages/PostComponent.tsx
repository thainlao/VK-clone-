import { Post } from "../types/types";
import '../styles/Post.css';
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hoocs/hoocs";
import { likePost } from "../redux/reducers/postSlice";

const PostComponent: React.FC<Post> = ({
    username,
    title,
    text,
    views,
    imgUrl,
    createdAt,
    comments,
    _id,
    likes,
}) => {

  const { id } = useParams<{ id: string }>();
  const posts = useAppSelector((state) => state.postSlice.posts)
  const post: Post | undefined = posts.find((p) => p._id === id);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.user);
  const {isLoading} = useAppSelector((state) => state.authReducer)
  
  const handleLike = (postId: string) => {
    const liked = post?.likes.some((like: any) => like.userId === user?.id)
    if (liked) {
      dispatch(likePost(postId));
    } else {
      dispatch(likePost(postId));
  }
}

    return (
      <Link to={`/${_id}`}>
            <div className="post">
        <h2>{title}</h2>
        <div className="post_line"></div>
        <p className="post_created">By {username}</p>
        <p className="date">{new Date(createdAt).toLocaleString()}</p>

        <div className="post_img_continer">
          {imgUrl && <img className="post_img" src={`http://localhost:5001/${imgUrl}`} alt="Post Image" />}
        </div>

        
        <p>{text}</p>
        <div className="post_line"></div>

        <div className="post_info">
          <button className="post_info_part">Likes: {likes ? likes.length : 0}</button>
          <p className="post_info_part">Comments: {comments.length}</p>
        </div>

        <div className="post_line"></div>

        <div className="post_info_com">
        </div>
      </div>
      {isLoading ? <p>Loading</p> : ''}
      </Link>
    );
  };
  
export default PostComponent;