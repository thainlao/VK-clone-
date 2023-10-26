import { useAppSelector } from '../hoocs/hoocs';
import { checkIsAuth } from '../redux/reducers/authSlice';
import '../styles/leftsection.css';

const LeftSection = () => {
    const isAuth = useAppSelector((state) => checkIsAuth(state.authReducer))

    return (
        <div>
        {isAuth && (
            <div className="left_section">
                <a className="link" href='/myprofile'>My profile</a>
                <a className="link" href='/'>News</a>
                <a className="link">Messanger</a>
                <a className="link" href='/allusers'>Friends</a>
                <a className="link" href='/communities'>Communities</a>
                <a className="link" href='/images'>Photoes</a>
                <a className="link">Music</a>
                <a className="link">Videos</a>
                <a className="link">Market</a>
                <a className="link">Clips</a>
                <div className="horizontailline"></div>  
            </div>
            )}
            {!isAuth && (
                <div></div>
            )}
            </div>
    )
}

export default LeftSection;