import {useState, useEffect} from "react";
import {Post, getPosts} from "@store/posts";
import AddPost from "@components/AddPost";
import RemovePost from "@components/RemovePost";
import PostCardList from "@components/PostCardList";
import "./App.css";

function App() {
    const [posts, setPosts] = useState<Post[]>([]);

    const addPosts = (newPost: Post) => {
        setPosts((prev) => [newPost, ...prev]);
    };

    const removePosts = (id: number) => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };

    const updatePosts = (id: number, newPost: Post) => {
        setPosts((prev) =>
            prev.map((post) => (post.id === id ? newPost : post))
        );
    };

    const initialPosts = async () => {
        try {
            const postsData = await getPosts();
            setPosts(postsData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        initialPosts();
    }, []);

    return (
        <>
            <AddPost addPosts={addPosts} />
            <PostCardList posts={posts} />
            <RemovePost removePost={removePosts} />
        </>
    );
}

export default App;
