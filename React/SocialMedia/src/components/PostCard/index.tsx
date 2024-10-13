import {Post} from "@store/posts";
import "./index.css";

const PostCard: React.FC<Post> = ({title, body}) => {
    return (
        <div className="post_card_wrapper">
            <h2>{title}</h2>
            <p>{body}</p>
        </div>
    );
};

export default PostCard;
