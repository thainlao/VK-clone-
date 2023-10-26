import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hoocs/hoocs';
import { checkIsAuth, uploadAvatar } from '../redux/reducers/authSlice';
import '../styles/mypage.css';
import {useState, useEffect} from 'react';

const MyProfile: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.authReducer.user);
    const navigate = useNavigate();
    const [img, setImg] = useState<any>('');

    const isAuth = useAppSelector((state) => checkIsAuth(state.authReducer))
    const {status} = useAppSelector(state => state.authReducer)
  
    useEffect(() => {
      if(isAuth) {
        navigate('/');
      }
      
    }, [status, navigate])

    useEffect(() => {
        if (img) {
            const data = new FormData();
            data.append('image', img);
            dispatch(uploadAvatar(data)).then(() => {
                setImg('')
            }).then(() => {
                navigate('/myprofile')
            });
        }
    }, [img, dispatch, setImg]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImg(e.target.files?.[0] || null);
    };

    const [randomColor, setRandomColor] = useState<string>('');

    useEffect(() => {
        if (!user?.avatar) {
            const randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
            setRandomColor(randomColor);
        }
    }, [user]);

    return (
        <div className='profile'>
            <div className='proile_section_one'>

            <div className='avatar_profile'>
                    <label>Изменить аватар
                        <input type="file" className='inputprofile' onChange={handleImageChange} />
                    </label>

                    {user?.avatar ? (
                        <img className="avatar_img" src={`http://localhost:5001/${user.avatar}`} alt="User Avatar" />
                    ) : (
                        <div className="avatar_color" style={{ backgroundColor: randomColor }}></div>
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

export default MyProfile;