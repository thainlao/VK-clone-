import { useAppDispatch, useAppSelector } from "../hoocs/hoocs";
import { getAllUsers } from "../redux/reducers/authSlice";
import { IUser } from "../types/types";
import '../styles/friends.css';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const AllUsers = () => {
    const dispatch = useAppDispatch();
    const { users, isLoading } = useAppSelector((state) => state.authReducer);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    useEffect(() => {
        const filtered = users.filter((user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);

    return (
        <div className="friends">
            <div className="friends_count">
                <p>All Users : {filteredUsers.length}</p>
                <p>Friends Online : 0</p>
            </div>

            <input
                type="text"
                placeholder="Search by username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="friend_catrgory">
                {filteredUsers.length === 0 ? (
                    <p>По вашим запросам не найдено пользователей</p>
                ) : (
                    filteredUsers.map((user: IUser) => (
                        <Link to={`/user/${user._id}`} className="friend_container" key={user._id}>
                            {user.avatar ? (
                                <img className="friend_img" src={`http://localhost:5001/${user.avatar}`} alt="User Avatar" />
                            ) : (
                                <div className="friend_img_without"></div>
                            )}

                            <div className="name_section">
                                <h2>{user.name}</h2>
                                <h2>{user.surname}</h2>
                            </div>

                        </Link>
                    ))
                )}
            </div>
            {isLoading ? <p>loading</p> : ''}
        </div>
    )
}

export default AllUsers;