const password = document.getElementById("password");
const username = document.getElementById("username");
const login = document.getElementById("logBtn");

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
login.addEventListener("click", () => {
  window.location.href = `../PageHome/index.html?userId=${'test'}`;
});


console.log("hello");

fetchUserInfo(ori, 11233);
