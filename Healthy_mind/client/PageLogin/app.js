const password = document.getElementById("password");
const username = document.getElementById("username");
const loginButton = document.getElementById("logBtn");
document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("logBtn");
  
  loginButton.addEventListener("click", (event) => {
    event.preventDefault(); // למנוע שליחת הטופס באופן רגיל

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    console.log("Username:", username);
    console.log("Password:", password);
    window.location.href = `../PageHome/index.html?userId=${"test"}`;
    // אפשר להוסיף פה קוד כדי לשלוח את המידע לשרת או לעבד אותו בצורה אחרת
  });
});

console.log("Asdasd");
async function fetchUserInfo(username, password) {
  try {
    const response = await fetch("http://localhost:8080/api/isUserExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }, { password }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // console.log("User Info:", data);
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

// const order = login.onclick;

console.log("hello");

// fetchUserInfo(ori, 11233);
