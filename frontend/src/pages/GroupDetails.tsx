import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hoocs/hoocs';
import { getGroupById, joinGroup, leaveGroup, removeGrop } from '../redux/reducers/groupSlice';
import '../styles/group.css';
import { getAllUsers, getUserById } from '../redux/reducers/authSlice';

const GroupDetails: React.FC = () => {

  const { groupId } = useParams();
  const groups = useAppSelector((state) => state.groupSlice.groups);
  const group = groups.find((p) => p._id === groupId);
  
  const user = useAppSelector((state) => state.authReducer.user);
  const params = useParams();

  const {isLoading} = useAppSelector((state) => state.groupSlice)

  const [userDetails, setUserDetails] = useState([]);

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    if (group?.members) {
      fetchUserDetails(group.members);
    }
  }, [group?.members]);

  const handleJoinGroup = async () => { 
    try {
      await dispatch(joinGroup(groupId));
      await dispatch(getGroupById(groupId)); 
    } catch (e) {
      console.log(e);
    }
  };

  const handleLeaveGroup = async () => { 
    try {
      await dispatch(leaveGroup(groupId));
      await dispatch(getGroupById(groupId));
    } catch (e) {
      console.log(e);
    } 
  };

  const handleDeleteGroup = async () => {
    try {
      if (group) {
        dispatch(removeGrop(group?._id));
        navigate('/communities')
      }
    } catch (e) {
      console.log(e)
    }
    
  };

  const fetchUserDetails = async (memberIds: string[]) => {
    const userPromises = memberIds.map((memberId) => dispatch(getUserById(memberId)));
    const userData = await Promise.all(userPromises);
    setUserDetails(userData)
  }

  const fetchComments = useCallback(async() => {
    try {
      dispatch(getGroupById(params.id))
    } catch (e) {
      console.log(e)
    }
  }, [params.id, dispatch])


  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  useEffect(() => {
    dispatch(getGroupById());
}, []);

useEffect(() => {
  dispatch(getAllUsers());
}, []);

  return (
    <div className='group_detailed'>

      {group?.avatar ? (
        <img className="group_detailed_main_pic" src={`http://localhost:5001/${group.avatar}`} alt={`${group.avatar}`} />
      ): (
        <div className='group_detailed_main_pic_none'></div>
      )}

      <div className='group_detailed_pic'>
        {group?.avatar ? (
        <img className="group_detailed_sub_pic" src={`http://localhost:5001/${group.avatar}`} alt={`${group.avatar}`} />
        ) : (
        <div className="group_detailed_sub_pic_none"></div>
        )}
        <div className='group_detailed_text'>
          <p>{group?.name}</p>
          <p>{group?.description}</p>
        </div>
      </div>

      {user?._id === group?.author ? (
        <button onClick={handleDeleteGroup}>Удалить группу</button>
      ) : (
        <p className="you_are_not">У вас нет прав в этой группе</p>
      )}
      
      <div className='subbut'>
        <button onClick={handleLeaveGroup}>Leave Group</button>
        <button onClick={handleJoinGroup}>Join Group</button>
      </div>
          
      <div className='subs'>

        <div className='friendlist'>
            <div className='friendlist_text'>
              <h2>Followers</h2>
              <p>{group?.members.length}</p>
            </div>

            <div className='friends_section'>
              {userDetails.map((user: any) => (
                <div className='friend_section_detailed' key={user.payload._id}>
                  {user.payload.avatar ? (
                    <img
                      className="friend1"
                      src={`http://localhost:5001/${user.payload.avatar}`}
                    />
                  ) : (
                    <div className='friend'></div>
                  )}
                  <h2>{user.payload.name}</h2>
                </div>
              ))}
            </div>

        </div>

      </div>
      {isLoading ? <p>Loading</p> : ''}
      </div>
  );
};

export default GroupDetails;