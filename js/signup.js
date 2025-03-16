function signUp() {
    event.preventDefault();
    let emailData = document.getElementById("email").value;
    let passwordData = document.getElementById("password").value;
    let confirmPasswordData = document.getElementById("confirmPassword").value;
    let usernameData = document.getElementById("username").value;
    if (emailData === "" || passwordData === "" || confirmPasswordData === "" || usernameData === "") {
      alert("Please fill in all fields");
      return;
    }
    if (passwordData !== confirmPasswordData) {
      alert("Password and confirm password do not match");
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
      username: usernameData,
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
      <div class=" dropdown"> 
      <p class="nav-link">
      ${users[0].username} <i class="fa-solid fa-caret-down"><button class="drop-content" onclick="logout()">Log Out</button></i>
       
      </p> 
      
    </div>
      `;
    } else {
      document.getElementById('textt').innerHTML = `
      <a class="nav-link" href="login.html">Log in</a>`
    }
  }
  
  checkLoginStatus()
  
  function logout() {
    localStorage.removeItem("isLogin");
    location.reload();
  }