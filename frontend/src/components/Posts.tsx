import PostComponent from '../pages/PostComponent';
import { Post } from '../types/types';
import { useAppSelector } from '../hoocs/hoocs';

const Posts = () => {
  const posts = useAppSelector((state) => state.postSlice.posts)


  return (
    <div>
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
    </div>
  )
}

export default Posts
