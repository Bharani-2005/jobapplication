document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("jobForm");
  const jobList = document.getElementById("jobList");
  const submitBtn = document.getElementById("submitBtn");
  const companySelect = document.getElementById("company");
  const roleSelect = document.getElementById("role");
  const dateInput = document.getElementById("date");
  const jobLevelSelect = document.getElementById("jobLevel");

  const currentUser = localStorage.getItem("loggedInUser");

if (!currentUser) {
  window.location.href = "login.html";
}


  dateInput.valueAsDate = new Date();

  const companyRoles = {
    Google: ["Software Engineer", "Frontend Developer", "Backend Developer"],
    Amazon: ["SDE I", "SDE II", "Cloud Engineer"],
    Microsoft: ["Full Stack Developer", "DevOps Engineer"],
    Infosys: ["System Engineer", "Java Developer"],
    TCS: ["Junior Developer", "Support Engineer"],
    Zoho: ["Product Engineer", "Web Developer"],
    Flipkart: ["UI Developer", "Backend Engineer"]
  };

  

  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  let editIndex = null;

  function loadCompanies() {
    Object.keys(companyRoles).forEach(company => {
      const option = document.createElement("option");
      option.value = company;
      option.textContent = company;
      companySelect.appendChild(option);
    });
  }

  loadCompanies();

  
  companySelect.addEventListener("change", function () {
  roleSelect.innerHTML = `<option value="">Select Role</option>`;

  const selectedCompany = this.value;

  if (!selectedCompany) return;

  const roles = companyRoles[selectedCompany];

  if (!roles) return;

  roles.forEach(role => {
    const option = document.createElement("option");
    option.value = role;
    option.textContent = role;
    roleSelect.appendChild(option);
  });
});

  
  
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const job = {
      company: companySelect.value,
      role: roleSelect.value,
      status: document.getElementById("status").value,
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

    localStorage.setItem("jobs", JSON.stringify(jobs));
    form.reset();
    dateInput.valueAsDate = new Date();
    roleSelect.innerHTML = `<option value="">Select Role</option>`; 
    displayJobs();
  });

  
  function displayJobs() {
    jobList.innerHTML = "";
    jobs.forEach((job, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${job.company}</td>
        <td>${job.role}</td>
        <td>${job.status}</td>
        <td>${job.date}</td>
        <td>${job.jobLevel}</td>
        <td>
          <button onclick="editJob(${index})">Edit</button>
          <button onclick="deleteJob(${index})">Delete</button>
        </td>
      `;
      jobList.appendChild(row);
    });
  }

  
  window.editJob = function (index) {
    const job = jobs[index];

    companySelect.value = job.company;
    companySelect.dispatchEvent(new Event("change")); 
    roleSelect.value = job.role;

    document.getElementById("status").value = job.status;
    dateInput.value = job.date;
    jobLevelSelect.value = job.jobLevel;

    editIndex = index;
    submitBtn.textContent = "Update Job";
  };

  
  window.deleteJob = function (index) {
    jobs.splice(index, 1);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    displayJobs();
  };

  displayJobs();
});
