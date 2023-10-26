import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hoocs/hoocs';
import { createPost } from '../redux/reducers/postSlice';
import '../styles/Post.css';
import {useState} from 'react';

const AddPost = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [img, setImg] = useState<any>('');
  const navigate = useNavigate();

  const handlePostCreate = () => {
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('text', text);
      if (img) {
        data.append('image', img);
      }
      dispatch(createPost(data));
      navigate('/')
      setTitle('')
      setText('')
      setImg('')
    } catch (e) {
      console.log(e);
    }
  };

  const clearPost = () => {
    setTitle('')
    setText('')
  }

  const clearImg = () => {
    setImg('')
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="post">
      <h2 className='post_title'>Что нового?</h2>
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

      <label className='postlabel'>Заголовок поста
        <input 
        type='text'
        className='post_text_input'
        placeholder='Заголовок поста'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className='postlabel'>Текст поста
        <input
        className='post_textarea'
        placeholder='Заголовок поста'
        value={text}
        onChange={(e) => setText(e.target.value)}
        />
      </label>

      <div className='post_buttons'>
        <button onClick={handlePostCreate}>Создать пост</button>
        <button onClick={clearPost}>Отменить пост</button>
      </div>
      
    </form>
  )
}

export default AddPost
