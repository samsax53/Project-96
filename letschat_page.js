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

room_name = localStorage.getItem("newRoom");
user_name = localStorage.getItem("lcUserName");

disRoomName = localStorage.getItem("currentRoom");
document.getElementById("webTitle").innerHTML = "LetsChat - #" + disRoomName + " ✉";
document.getElementById("roomNameDisplay").innerHTML = "#" + disRoomName;
document.getElementById("loaderDiv").style.display = "inline-block";
setTimeout(rmvLoader, 2000);

function rmvLoader(){
      document.getElementById("loaderDiv").style.display = "none";
      sendHiMsg();
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
      firebase_message_id = childKey;
      message_data = childData;     
//Start code
userName = message_data['name'];
userMsg = message_data['message'];
userLikes = message_data['like'];

name_with_tag = "<h4>" + userName + "</h4>";
message_with_tag = "<h4 class='message_h4'>" + userMsg + "</h4>"
button_with_tag = "<button class='btn btn-warning' id="+firebase_message_id+" value="+userLikes+" onclick='updateLikes(this.id)'>";
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> <b style='margin-left: -5px; font-family: Montserrat'> Likes: " + userLikes + "</b></span></button><hr>";
row = name_with_tag + message_with_tag + button_with_tag + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
} });  }); }
getData();

function rmvAlert() {
      document.getElementById("alertH4").style.display = "none";
}

function sendMsg() {
      userMsg = document.getElementById("msg").value;
      if(userMsg == ""){
            document.getElementById("alertH4").style.display = "inline-block";
            setTimeout(rmvAlert, 2000)
      } else {
            userMsg = document.getElementById("msg").value;
            firebase.database().ref(room_name).push({
                  like:0,
                  message:userMsg,
                  name:user_name
            });
            document.getElementById("msg").value = "";
            document.getElementById("output").style.display = "inline-block";
      }
}

function sendHiMsg() {
      userHiMsg = user_name + " is here!";
      firebase.database().ref(room_name).push({
            like:0,
            message:"",
            name:userHiMsg
      });
      document.getElementById("msg").value = "";
      document.getElementById("output").style.display = "inline-block";
}

function updateLikes(message_id) {
      console.log("New like: " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}

function logOut() {
      localStorage.removeItem("kwitterUsername");
      localStorage.removeItem("newRoom");
      window.location = "letschat.html"
}
