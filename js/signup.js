function signUp() {
    event.preventDefault();
    let emailData = document.getElementById("email").value;
    let passwordData = document.getElementById("password").value;
    let dobData = document.getElementById("date").value;
    let addressData = document.getElementById("address").value;
  
    if (emailData === "" || passwordData === "") {
      alert("Please fill in all fields");
      return;
    }
  
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === emailData) {
        alert("Email already exists");
        return;
      }
    }
  
    const data = {
      email: emailData,
      password: passwordData,
      dob: dobData,
      address: addressData,
    };
  
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("Sign up successfully");
    location.href ="login.html"
  }
  
  
  function checkLoginStatus() {
    const isLogin = localStorage.getItem("isLogin");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (isLogin) {
      document.getElementById('textt').innerHTML= `
      <div class="nav-link" id="textt"> ${users[0].email}  </a>
      `;
    } else {
      document.getElementById('textt').innerHTML = `
      <a class="nav-link" id="textt" href="./login.html">Log in</a>`
    }
  }
  
  checkLoginStatus()
  
  function logout() {
    localStorage.removeItem("isLogin");
    location.reload();
  }