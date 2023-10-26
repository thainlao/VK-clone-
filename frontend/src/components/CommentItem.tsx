
import { Link } from 'react-router-dom';
import { Comment} from '../types/types';

interface CommentItemProps {
    cmt: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ cmt }) => {

    return (
        <div className="comment">
            {cmt.comment}
            <Link to={`/user/${cmt.author}`}>Автор</Link>
        </div>
    );
};

export default CommentItem;