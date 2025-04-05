// user info storage - localstorage

function getUserInfo() {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
        const user = JSON.parse(userInfo);
        document.getElementById("fname").value = user.firstname;
        document.getElementById("lname").value = user.lastname;
    }
}

document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const firstName = document.getElementById("fname").value;
    const lastName = document.getElementById("lname").value;

    const userInfo = {
        firstname: firstName,
        lastname: lastName
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    alert("Information saved!");
});
  
getUserInfo();



// toggle dark and light mode - sessionstorage

function myFunction() {
    const element = document.body;
    element.classList.toggle("dark-mode");

    if (element.classList.contains("dark-mode")) {
        sessionStorage.setItem("theme", "dark");
    }
    else {
        sessionStorage.setItem("theme", "light");
    }
}

window.onload = function() {
    const theme = sessionStorage.getItem("theme");
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    }
};

document.getElementById("themeToggleBtn").addEventListener("click", myFunction);