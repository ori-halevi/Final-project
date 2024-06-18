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
  fetchDoctorInfo("667136193e89e4d10972cf67")
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
  fetchUserInfo("666f1ec8468942bbef3b7222")
);
