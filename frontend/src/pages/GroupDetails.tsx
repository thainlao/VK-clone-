import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hoocs/hoocs';
import { getGroupById, joinGroup } from '../redux/reducers/groupSlice';
import '../styles/group.css';

const GroupDetails: React.FC = () => {

  const { groupId } = useParams();
  const dispatch = useAppDispatch();
  const groups = useAppSelector((state) => state.groupSlice.groups);
  const {isLoading} = useAppSelector((state) => state.groupSlice)
  const userId = useAppSelector((state) => state.authReducer.user?._id);
  const group = groups.find((p) => p._id === groupId);

  const handleJoinGroup = () => {
    try{
      dispatch(joinGroup(groupId))
    } catch (e) {

    }
  };


  useEffect(() => {
    dispatch(getGroupById(groupId))
  }, [groupId, dispatch])


  return (
    <div className='group_detailed'>
      {group?.avatar && (
      <img className="group_detailed_main_pic" src={`http://localhost:5001/${group.avatar}`} alt={`${group.avatar}`} />
    )}

      <div className='group_detailed_pic'>
      {group?.avatar && (
      <img className="group_detailed_sub_pic" src={`http://localhost:5001/${group.avatar}`} alt={`${group.avatar}`} />
    )}
      <div className='group_detailed_text'>
      <p>{group?.name}</p>
      <p>{group?.description}</p>
      </div>
      </div>

    <div className='subs'>

      <div>{group?.members.length}</div>
      
      {group?.members.map((user) => (
        <div key={user._id}>
          {user?.username}
        </div>
      ))}

      <button onClick={handleJoinGroup}>JOIN</button>

      <div className='friendlist'>

          <div className='friendlist_text'>
            <h2>Followers</h2>
            <p>{group?.members.length}</p>
          </div>

          <div className='friends_section'>
            <div className='friend_first'>
              <div className='friend'></div>
              <div className='friend'></div>
              <div className='friend'></div>
            </div>

            <div className='friend_second'>
              <div className='friend1'></div>
              <div className='friend1'></div>
              <div className='friend1'></div>
            </div>
          </div>

      </div>

    </div>
    {isLoading ? <p>Loading</p> : ''}
    </div>
  );
};

export default GroupDetails;