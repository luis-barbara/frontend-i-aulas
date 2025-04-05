// Estrutura de objectos para interagir com mockapi

const user = {
    id: 1,
    name: "User 1",
    email: "user1@email.com",
    password: "123456",
    avatarUrl: "https://via.placeholder.com/150",
    createdAt: 1,
    updatedAt: 1,
    posts: [],
}

const filename = "data.json";

const obj = JSON.stringify(user);
console.log(obj);
const obj1 = JSON.parse(obj);
console.log(obj1.name)



const post = {
    userId: 1,
    title: "Post 1",
    body: "Descrição do post",
    imageUrl: "https://via.placeholder.com/600",
    tags: ["arte", "IA"],
    likes: [],
    comments: [],
    createdAt: 1,
    updatedAt: 1,
}


async function getPosts() {
    try {
        const response = await fetch("data.json");
        const data = await response.json();
        console.log(data);
    }
    catch (error) {}
}
getPosts()




const comment = {
    id: 1,
    postId: 1,  
    userId: 1,  
    text: "Comentário de teste",
    createdAt: 1,
}
