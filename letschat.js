function rmvAlert() {
    document.getElementById("alertH4").style.display = "none";
}

function rmvLoader(){
    document.getElementById("loaderDiv").style.display = "none";
    document.getElementById("userNameInput").value = "";
    window.location = "letschat_lobby.html"
}

function addUserName() {
    userName = document.getElementById("userNameInput").value;
    if(userName == ""){
        document.getElementById("alertH4").style.display = "inline-block";
        setTimeout(rmvAlert, 2000)
    } else {
        localStorage.setItem("lcUserName", userName);
        document.getElementById("loaderDiv").style.display = "inline-block";
        setTimeout(rmvLoader, 2000);
    }
}