async function fetchUserInfo() {
    try {
      const response = await fetch("http://localhost:8080/api/getUserInfo");
      const user = await response.json();
      return user;
    } catch (error) {
      console.error("Error fetching users info:", error);
      return [];
    }
  }

const password = document.getElementById("password")
const username = document.getElementById("username")
const login = document.getElementById("logBtn")


function userCheck(username, password) {
    if(username === fetchUserInfo.full_name && password === fetchUserInfo.password){
       login.onclick = window.location.href="./PageHome/index.html"
    }
    else{
        return
    }
}
userCheck(username,password)    
