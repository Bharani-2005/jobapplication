document.addEventListener("DOMContentLoaded", function () {

  // 🔐 LOGIN CHECK
  const currentUser = localStorage.getItem("loggedInUser");
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  // 📌 ELEMENTS
  const form = document.getElementById("jobForm");
  const jobList = document.getElementById("jobList");
  const submitBtn = document.getElementById("submitBtn");
  const companySelect = document.getElementById("company");
  const roleSelect = document.getElementById("role");
  const dateInput = document.getElementById("date");
  const jobLevelSelect = document.getElementById("jobLevel");
  const statusSelect = document.getElementById("status");

  // 📅 DEFAULT DATE
  dateInput.valueAsDate = new Date();

  // 🏢 COMPANY → ROLES
  const companyRoles = {
    Google: ["Software Engineer", "Frontend Developer", "Backend Developer"],
    Amazon: ["SDE I", "SDE II", "Cloud Engineer"],
    Microsoft: ["Full Stack Developer", "DevOps Engineer"],
    Infosys: ["System Engineer", "Java Developer"],
    TCS: ["Junior Developer", "Support Engineer"],
    Zoho: ["Product Engineer", "Web Developer"],
    Flipkart: ["UI Developer", "Backend Engineer"]
  };

  // 🖼️ COMPANY LOGOS
  const companyLogos = {
    Google: "logos/google.jpg",
    Amazon: "logos/amazon.png",
    Microsoft: "logos/microsoft.png",
    TCS: "logos/tcs.jpg",
    Infosys: "logos/infosys.png",
    Zoho: "logos/zoho.png",
    Flipkart: "logos/flipkart.png"
  };

  // 💾 USER BASED STORAGE
  const jobKey = `jobs_${currentUser}`;
  let jobs = JSON.parse(localStorage.getItem(jobKey)) || [];
  let editIndex = null;

  // 🏢 LOAD COMPANIES
  function loadCompanies() {
    companySelect.innerHTML = `<option value="">Select Company</option>`;
    Object.keys(companyRoles).forEach(company => {
      const option = document.createElement("option");
      option.value = company;
      option.textContent = company;
      companySelect.appendChild(option);
    });
  }
  loadCompanies();

  // 🎯 LOAD ROLES ON COMPANY CHANGE
  companySelect.addEventListener("change", function () {
    roleSelect.innerHTML = `<option value="">Select Role</option>`;
    const roles = companyRoles[this.value];
    if (!roles) return;

    roles.forEach(role => {
      const option = document.createElement("option");
      option.value = role;
      option.textContent = role;
      roleSelect.appendChild(option);
    });
  });

  // ➕ ADD / UPDATE JOB
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!companySelect.value || !roleSelect.value) {
      alert("Please select company and role");
      return;
    }

    const job = {
      company: companySelect.value,
      role: roleSelect.value,
      status: statusSelect.value,
      date: dateInput.value,
      jobLevel: jobLevelSelect.value
    };

    if (editIndex === null) {
      jobs.push(job);
    } else {
      jobs[editIndex] = job;
      editIndex = null;
      submitBtn.textContent = "Add Job";
    }

    localStorage.setItem(jobKey, JSON.stringify(jobs));
    form.reset();
    dateInput.valueAsDate = new Date();
    roleSelect.innerHTML = `<option value="">Select Role</option>`;
    displayJobs();
  });

  // 📋 DISPLAY JOBS
  function displayJobs() {
    jobList.innerHTML = "";

    jobs.forEach((job, index) => {
      const row = document.createElement("tr");
      const logo = companyLogos[job.company] || "logos/default.png";

      row.innerHTML = `
        <td class="company-cell">
          <img src="${logo}" class="company-logo" alt="${job.company}">
          <span>${job.company}</span>
        </td>
        <td>${job.role}</td>
        <td>${job.jobLevel}</td>
        <td>${job.status}</td>
        <td>${job.date}</td>
        <td>
          <button onclick="editJob(${index})">Edit</button>
          <button onclick="deleteJob(${index})">Delete</button>
        </td>
      `;
      jobList.appendChild(row);
    });
  }

  // ✏️ EDIT JOB
  window.editJob = function (index) {
    const job = jobs[index];
    companySelect.value = job.company;
    companySelect.dispatchEvent(new Event("change"));
    roleSelect.value = job.role;
    statusSelect.value = job.status;
    dateInput.value = job.date;
    jobLevelSelect.value = job.jobLevel;

    editIndex = index;
    submitBtn.textContent = "Update Job";
  };

  // 🗑️ DELETE JOB
  window.deleteJob = function (index) {
    if (confirm("Delete this job?")) {
      jobs.splice(index, 1);
      localStorage.setItem(jobKey, JSON.stringify(jobs));
      displayJobs();
    }
  };

  // 🚀 INITIAL LOAD
  displayJobs();
});
