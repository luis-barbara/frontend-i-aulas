function getUserPost() {
    const userPost = localStorage.getItem("userPost");
    if (userPost) {
        const user = JSON.parse(userPost);
        document.getElementById("fname").value = user.firstname;
        document.getElementById("note").value = user.note;
    }
}

document.addEventListener("DOMContentLoaded", () => {
})

document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("fname").value;
    const note = document.getElementById("note").value;

    const userPost = {
        firstname: firstName,
        note: note
    };

    const userPostList = JSON.parse(localStorage.getItem("userPostList"));
    console.log(userPostList);

    if (userPostList) {
        userPostList.posts.push(userPost);
    } else {
        userPostList = { posts: [userPost] };
    }

        localStorage.setItem("userPostList", JSON.stringify(userPostList));
    
    alert("Information saved!");
});

getUserPost();