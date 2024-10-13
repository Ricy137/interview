import PostCard from "@components/PostCard";
import {Post} from "@store/posts";
import "./index.css";

const PostCardList: React.FC<{posts: Post[]}> = ({posts}) => {
    return (
        <div className="post_card_list">
            {posts.map((post) => (
                <PostCard key={post.id} {...post} />
            ))}
        </div>
    );
};

export default PostCardList;
