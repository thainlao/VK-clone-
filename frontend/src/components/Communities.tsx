import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hoocs/hoocs';
import { createGroup, getAllGroups } from '../redux/reducers/groupSlice';
import { Link } from 'react-router-dom';
import { IGroup } from '../types/types';
import '../styles/group.css';

const GroupItem = ({ group }: { group: IGroup }) => (
    <Link to={`/group/${group._id}`}>
      <div className='group_item'>
        {group.avatar ? (
          <img className="avatar_group" src={`http://localhost:5001/${group.avatar}`} alt={`${group.avatar}`} />
        ): (
          <div className='avatar_group_none'></div>
        )}

        <div className='group_item_text'>
          <h2>{group.name}</h2>
          <p>{group.thema}</p>
          <p>{group.members.length} followers</p>
          <p>{group.username}</p>
        </div>

      </div>
    </Link>
  );

const Communities = () => {
    const dispatch = useAppDispatch();
    const {groups, isLoading} = useAppSelector((state) => state.groupSlice);
    
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [img, setImg] = useState<any>('');
    const [thema, setThema] = useState<any>('');
    
    const handleCreateGroup = () => {
        try {
            const data = new FormData();
            data.append('name', name);
            data.append('thema', thema);
            data.append('description', description);
            if (img) {
              data.append('image', img);
            }
            dispatch(createGroup(data));
            setName('')
            setDescription('')
            setImg('')
            setThema('')
          } catch (e) {
            console.log(e);
          }
      };

    useEffect(() => {
        dispatch(getAllGroups());
    }, []);

    const clearImg = () => {
        setImg('')
      }

    return (
        <div className='group_form'>
            <form>
                <h2>Create Group</h2>

                <label>
                    Прикрепить изображение
                    <input type="file" className='inputpost' onChange={(e) => setImg(e.target.files?.[0] || null)}/>
                </label>

                <div>
                    {img && 
                    <div className='imgsection_div'>
                    <img className='imgsection' src={URL.createObjectURL(img)} alt='IMAGE'/>
                    <div onClick={clearImg} className='clearbutton'></div>
                    </div>}
                </div>
                
                <div className='group_input'>
                  <input
                      type="text"
                      placeholder="Group Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />

                  <input
                      type="text"
                      placeholder="Категория, например Юмор или Фото"
                      value={thema}
                      onChange={(e) => setThema(e.target.value)}
                  />

                  <input
                      type="text"
                      placeholder="Group Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <button className='create_group' onClick={handleCreateGroup}>Create Group</button>
            </form>

            <div className='group_counter'>
              <p>All Groups</p>
              <p>{groups.length}</p>
            </div>
            
            <div className='groups_length'>
                {groups.map((group: IGroup) => (
                    <GroupItem key={group._id} group={group} />
                ))}
            </div>
            {isLoading ? <p>Loading</p> : ''}
        </div>
    )
}

export default Communities;