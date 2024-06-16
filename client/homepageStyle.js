document.getElementById("searchBox").addEventListener("input", function () {
  let filter = this.value.toLowerCase();
  let doctorList = document.getElementById("doctorList");
  let doctors = doctorList.getElementsByTagName("li");

  for (let i = 0; i < doctors.length; i++) {
    let doctorName = doctors[i].textContent || doctors[i].innerText;
    if (doctorName.toLowerCase().indexOf(filter) > -1) {
      doctors[i].style.display = "";
    } else {
      doctors[i].style.display = "none";
    }
  }
});

document.getElementById("doctorList").addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "LI") {
    document.getElementById("dropdownButton").textContent =
      e.target.textContent;
    document.getElementById("dropdown-content").style.display = "none";
  }
});

document
  .getElementById("dropdownButton")
  .addEventListener("click", function () {
    let dropdownContent = document.getElementById("dropdown-content");
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });

document.addEventListener("click", function (e) {
  let dropdownContent = document.getElementById("dropdown-content");
  if (!document.getElementById("doctorsDropdown").contains(e.target)) {
    dropdownContent.style.display = "none";
  }
});

// quick search
// doctors
document.getElementById("QGsearchBox").addEventListener("input", function () {
  let QGfilter = this.value.toLowerCase();
  let QGdoctorList = document.getElementById("QGdoctorList");
  let QGdoctors = QGdoctorList.getElementsByTagName("li");

  for (let i = 0; i < QGdoctors.length; i++) {
    let QGdoctorName = QGdoctors[i].textContent || QGdoctors[i].innerText;
    if (QGdoctorName.toLowerCase().indexOf(QGfilter) > -1) {
      QGdoctors[i].style.display = "";
    } else {
      QGdoctors[i].style.display = "none";
    }
  }
});

document.getElementById("QGdoctorList").addEventListener("click", function (e) {
  if (e.target && e.target.nodeName == "LI") {
    document.getElementById("QGdropdownButton").textContent =
      e.target.textContent;
    document.getElementById("QGdropdown-content").style.display = "none";
  }
});

document
  .getElementById("QGdropdownButton")
  .addEventListener("click", function () {
    let QGdropdownContent = document.getElementById("QGdropdown-content");
    if (QGdropdownContent.style.display === "block") {
      QGdropdownContent.style.display = "none";
    } else {
      QGdropdownContent.style.display = "block";
    }
  });

document.addEventListener("click", function (e) {
  let QGdropdownContent = document.getElementById("QGdropdown-content");
  if (!document.getElementById("QGdoctorsDropdown").contains(e.target)) {
    QGdropdownContent.style.display = "none";
  }
});
// Treatments
document
  .getElementById("QGtreatmentsSearchBox")
  .addEventListener("input", function () {
    let QGfilter = this.value.toLowerCase();
    let QGdoctorList = document.getElementById("QGtreatmentsList");
    let QGdoctors = QGdoctorList.getElementsByTagName("li");

    for (let i = 0; i < QGdoctors.length; i++) {
      let QGdoctorName = QGdoctors[i].textContent || QGdoctors[i].innerText;
      if (QGdoctorName.toLowerCase().indexOf(QGfilter) > -1) {
        QGdoctors[i].style.display = "";
      } else {
        QGdoctors[i].style.display = "none";
      }
    }
  });

document
  .getElementById("QGtreatmentsList")
  .addEventListener("click", function (e) {
    if (e.target && e.target.nodeName == "LI") {
      document.getElementById("QGtreatmentsDropdownButton").textContent =
        e.target.textContent;
      document.getElementById("QGtreatmentsDropdown-content").style.display =
        "none";
    }
  });

document
  .getElementById("QGtreatmentsDropdownButton")
  .addEventListener("click", function () {
    let QGdropdownContent = document.getElementById(
      "QGtreatmentsDropdown-content"
    );
    if (QGdropdownContent.style.display === "block") {
      QGdropdownContent.style.display = "none";
    } else {
      QGdropdownContent.style.display = "block";
    }
  });

document.addEventListener("click", function (e) {
  let QGdropdownContent = document.getElementById(
    "QGtreatmentsDropdown-content"
  );
  if (!document.getElementById("QGtreatmentsDropdown").contains(e.target)) {
    QGdropdownContent.style.display = "none";
  }
});
