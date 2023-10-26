import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hoocs/hoocs';
import '../styles/mypage.css';
import { useEffect} from 'react';
import { getUserById } from '../redux/reducers/authSlice';

const UserDetailPage = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.user);

  useEffect(() => {
    dispatch(getUserById(userId))
  }, [userId, dispatch])


  return (
    <div className='profile'>
    <div className='proile_section_one'>

    <div className='avatar_profile'>
            {user?.avatar ? (
                <img className="avatar_img" src={`http://localhost:5001/${user.avatar}`} alt="User Avatar" />
            ) : (
                <div className="avatar_color"></div>
            )}
        </div>
        <h2 className='profile_text'>{user?.username}</h2>
    </div>

    <div className='proile_section_two'>
        <button>NFT</button>
        <button>Photos</button>
        <button>Music</button>
        <button>Clips</button>
    </div>
</div>
  );
};

export default UserDetailPage;