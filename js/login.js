
  function login() {
    event.preventDefault();
    let emailData = document.getElementById("email").value;
    let passwordData = document.getElementById("password").value;
  
    if (emailData === "" || passwordData === "") {
      alert("Please fill in all fields");
      return;
    }
      const users = JSON.parse(localStorage.getItem("users")) || [];
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === emailData && users[i].password === passwordData) {
        const isLogin = true;
        localStorage.setItem("isLogin", isLogin);
        const userEmail = users[i].email;
        const userName= users[i].username;
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("userName", userName);
        alert("Log in successfully");  
        location.href='index.html'  
        return;
      }
    }
    alert("email or password is incorrect");
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