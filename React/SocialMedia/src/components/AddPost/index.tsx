import {useRef} from "react";
import {Post} from "@store/posts";
import "./index.css";

interface AddPostFormElements extends HTMLFormControlsCollection {
    userIdSelector: HTMLSelectElement;
    titleInput: HTMLInputElement;
    bodyInput: HTMLInputElement;
}

interface AddPostForm extends HTMLFormElement {
    elements: AddPostFormElements;
}

interface AddPostProps {
    addPosts: (newPost: Post) => void;
}

const AddPost: React.FC<AddPostProps> = ({addPosts}) => {
    const formRef = useRef<AddPostForm>(null);

    const handleSubmit = (e: React.FormEvent<AddPostForm>) => {
        e.preventDefault();
        const {elements} = e.currentTarget;
        const {userIdSelector, titleInput, bodyInput} = elements;
        addPosts({
            id: new Date().getTime(),
            userId: userIdSelector.value,
            title: titleInput.value,
            body: bodyInput.value,
        });
        formRef.current?.reset();
    };

    return (
        <form
            ref={formRef}
            className="post_form_wrapper"
            onSubmit={handleSubmit}
        >
            <div className="post_form_item">
                <label htmlFor="userIdSelector">userId: </label>
                <select name="userIdSelector" required>
                    <option value="">Please select userId</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
            </div>
            <div className="post_form_item">
                <label htmlFor="titleInput">title: </label>
                <input type="text" name="titleInput" required />
            </div>
            <div className="post_form_item">
                <label htmlFor="bodyInput">body: </label>
                <input type="text" name="bodyInput" required />
            </div>
            <div className="post_form_item">
                <input type="submit" value="submit" />
                <input type="reset" value="clear" />
            </div>
        </form>
    );
};

export default AddPost;
