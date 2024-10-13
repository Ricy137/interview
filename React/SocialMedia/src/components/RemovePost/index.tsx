import {useRef} from "react";

interface RemovePostFormElements extends HTMLFormControlsCollection {
    idInput: HTMLInputElement;
}

interface RemovePostForm extends HTMLFormElement {
    elements: RemovePostFormElements;
}

interface RemovePostProps {
    removePost: (id: number) => void;
}

const RemovePost: React.FC<RemovePostProps> = ({removePost}) => {
    const formRef = useRef<RemovePostForm>();

    const handleSubmit = (e: React.FormEvent<RemovePostForm>) => {
        e.preventDefault();
        const {elements} = e.currentTarget;
        removePost(parseInt(elements.idInput.value));
        formRef.current?.reset();
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="post_form_item">
                <label htmlFor="idInput">remove Id: </label>
                <input type="number" name="idInput" required />
            </div>
            <div className="post_form_item">
                <input type="submit" value="submit" />
                <input type="reset" value="clear" />
            </div>
        </form>
    );
};

export default RemovePost;
