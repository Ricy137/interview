export interface Post {
    id: number;
    userId: number | string;
    title: string;
    body: string;
}

export const getPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    return data.slice(0, 5);
};
