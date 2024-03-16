const showToggleMenu = () => {
    const menu = document.getElementById("menu-toggle");
    menu.classList.add("show");
    const h = document.getElementById("h");
    h.classList.add("overflow");
  };
  const hiddenToggleMenu = () => {
    const menu = document.getElementById("menu-toggle");
    menu.classList.remove("show");
    const h = document.getElementById("h");
    h.classList.remove("overflow");
  };
  const dropdown = (id) => {
    const element = document.getElementById("list_" + id);
    element.classList.add("show");
    if (element.style.display == "block") element.style.display = "none";
    else element.style.display = "block";
  };


  const validateform = (event) => {
    event.preventDefault();
    const name = document.myForm.name.value;
    const email = document.myForm.email.value;
    const password = document.myForm.password.value;
  
    const fName = document.getElementById("name");
    const fEmail = document.getElementById("email");
    const fPassword = document.getElementById("password");
  
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    if (name === "") {
      fName.innerHTML = "Name can't be blank";
      return false;
    }
    if (email === "") {
      fEmail.innerHTML = "Email can't be blank";
      fName.innerHTML = "";
      return false;
    } else {
      if (!email.match(mailFormat)) {
        fEmail.innerHTML = "Email address is not valid";
        fName.innerHTML = "";
        return false;
      }
    }
    if (password === "") {
      fPassword.innerHTML = "Password can't be blank";
      fName.innerHTML = "";
      fEmail.innerHTML = "";
      return false;
    } else {
      if (password.length <= 8) {
        fPassword.innerHTML = "Password must be at least 8 characters long";
        fName.innerHTML = "";
        fEmail.innerHTML = "";
        return false;
      }
    }
    fPassword.innerHTML = "";
    console.log(name, email, password);
    return false;
  };