//user_api.js

const apiURL = "https://67f56877913986b16fa47859.mockapi.io/api/";

export const getPosts = async () => {
    const response = await fetch(apiURL + "Posts");
    const data = await response.json();
    console.log(data);
    return data;
};

export const getPost = async (id) => {
    const response = await fetch(apiURL + "posts/" + id);
    const data = await response.json();
    return data;
};

export const createPost = async (post) => {
    const response = await fetch(apiURL + "posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
    const data = await response.json();
    return data;
};

export const updatePost = async (id, post) => {
    try {
        const response = await fetch(apiURL + "posts/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        });

        // Check if the response is JSON before parsing
        const contentType = response.headers.get("content-type");
        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Update failed: ${errorText}`);
        }
        
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            throw new Error("Server did not return JSON response");
        }
    } catch (error) {
        console.error("Error updating the post:", error);
        throw error;
    }
};


export const deletePost = async (id) => {
    const response = await fetch(apiURL + "posts/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};
