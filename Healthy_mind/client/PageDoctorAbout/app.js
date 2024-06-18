// פונקציה להוצאת פרמטרים מה-URL
function getQueryParams() {
  const params = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  for (const [key, value] of urlParams) {
    params[key] = value;
  }
  return params;
}

document.addEventListener("DOMContentLoaded", function () {
  const params = getQueryParams();
  const contentDiv = document.getElementById("content");
  console.log(params.doctorId);
  if (params.doctorId) {
    console.log("here is content");
    contentDiv.innerHTML = `<h2>Welcome, User ${params.doctorId}</h2>`;
  } else {
    console.log("sdsdsddcwef");
    contentDiv.innerHTML = `<h2>Welcome, Guest</h2>`;
  }
});

async function fetchDoctorInfo(doctorId) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/getDoctorInfoById",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doctorId }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // console.log("Doctor Info:", data);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

document.addEventListener(
  "DOMContentLoaded",
  fetchDoctorInfo("6671261031493c86e4e30dc1")
);

async function fetchUserInfo(userId) {
  try {
    const response = await fetch("http://localhost:8080/api/getUserInfoById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    // console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // console.log("User Info:", data);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

document.addEventListener(
  "DOMContentLoaded",
  fetchUserInfo("666eeb05340d469f58628571")
);
