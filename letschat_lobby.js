const firebaseConfig = {
      apiKey: "AIzaSyDs7Z2xYnuBN_kVtjXuoUb93FUpaqecjZE",
      authDomain: "class94-49c66.firebaseapp.com",
      databaseURL: "https://class94-49c66-default-rtdb.firebaseio.com",
      projectId: "class94-49c66",
      storageBucket: "class94-49c66.appspot.com",
      messagingSenderId: "1015936550485",
      appId: "1:1015936550485:web:9b96238e34d5b58ad1f6dc"
};
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("lcUserName");
document.getElementById("userDis").innerHTML = "Welcome,&nbsp; <code style='background-color: rgba(0, 0, 0, 0.6); color: white; font-family: Montserrat;'>" + username + "</code>";

function rmvAlert() {
      document.getElementById("alertH4").style.display = "none";
}

function NewRoom() {
      roomName = document.getElementById("roomNameInput").value;
      if(roomName == ""){
            document.getElementById("alertH4").style.display = "inline-block";
            setTimeout(rmvAlert, 2000)
      } else {
            firebase.database().ref("/").child(roomName).update({
                  purpose : "To add a new room"
            });
            localStorage.setItem("newRoom", roomName);
            localStorage.setItem("currentRoom", roomName);
            document.getElementById("roomNameInput").value = "";
            window.location = "letschat_page.html";
      }
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("trendingRoomList").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log(Room_names);
      row = "<div style='color: black; font-family: Montserrat;' class='room_name' id="+Room_names+" onclick='redirectToRoom(this.id)'><b>#" + Room_names + "</b></div><hr>";
      document.getElementById("trendingRoomList").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRoom(name){
      console.log(name);
      localStorage.setItem("roomName", name);
      localStorage.setItem("currentRoom", name);
      window.location = "letschat_page.html";
}

function logOut() {
      localStorage.removeItem("kwitterUsername");
      localStorage.removeItem("newRoom");
      window.location = "letschat.html"
}
