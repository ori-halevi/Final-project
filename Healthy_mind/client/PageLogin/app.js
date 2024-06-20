const loginButton = document.getElementById("logBtn");

// By Ori 
async function isUserExistsFunc(username, password) {
  try {
    const response = await fetch("http://localhost:8080/api/isUserExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error;
  }
}

loginButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  try {
    const isUserExists = await isUserExistsFunc(username, password);
    console.log("isUserExists:", isUserExists);
    console.log("isUserExists:", isUserExists.userId);
    if (isUserExists.userId) {
      console.log("User exists:", isUserExists);
      goToHomePageAsUser(isUserExists.userId);
    } else {
      showSuccessPopup()
      console.log("User does not exist");
    }
  } catch (error) {
    console.error("Error during login process:", error);

  }
});
function showSuccessPopup() {
  const popup = document.getElementById("successPopup");
  popup.style.display = "block";

  // הסתרת הפופאפ אחרי 3 שניות
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}
function goToHomePageAsUser(userId) {
  window.location.href = `../PageHome/index.html?userId=${userId}`;
}
