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
  
    let usersLocalStorage = localStorage.getItem("users") || [];
  if (usersLocalStorage.length != 0) {
    const users = JSON.parse(usersLocalStorage);
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === emailData) {
        alert("Email already exists");
        return;
      }
    }
    
  }

    const data = {
      email: emailData,
      password: passwordData,
      username: usernameData,
    };
  
    if (usersLocalStorage.length === 0) {
      localStorage.setItem("users", JSON.stringify([data]));
    }
    else {
      const users = JSON.parse(usersLocalStorage);
      users.push(data);
      localStorage.setItem("users", JSON.stringify(users));
    }
  
    alert("Sign up successfully");
    location.href ="login.html"
  }
  
  
  function checkLoginStatus() {
    const isLogin = localStorage.getItem("isLogin");
        const userName = localStorage.getItem("userName");
    if (isLogin) {
      document.getElementById('textt').innerHTML= `
      
      <div class=" dropdown"> 
      <p class="nav-link">
      ${userName} <i class="fa-solid fa-caret-down"><button class="drop-content" onclick="logout()">Log Out</button></i>
       
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
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    location.reload();

  }