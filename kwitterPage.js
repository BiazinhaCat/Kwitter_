  //LINKS FIREBASE

const firebaseConfig = {
    apiKey: "AIzaSyBTm9ryWZZQD56fbKAXMG0J-WgSHS3x0wM",
    authDomain: "kwiter-dbd83.firebaseapp.com",
    databaseURL: "https://kwiter-dbd83-default-rtdb.firebaseio.com",
    projectId: "kwiter-dbd83",
    storageBucket: "kwiter-dbd83.appspot.com",
    messagingSenderId: "1004968167460",
    appId: "1:1004968167460:web:8c9f12085ab40609f170b1"
  };
  
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

  userName = localStorage.getItem("userName");
  roomName = localStorage.getItem("roomName");

  function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(roomName).push({
      name: userName,
      message: msg,
      like: 0
      
    })
    document.getElementById("msg").value = "";
  }

function getData() {

  firebase.database().ref("/"+roomName).on('value', 
  function(snapshot) { 
  document.getElementById("output").innerHTML = ""; 
  snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; 
  childData = childSnapshot.val();
  if(childKey != "purpose") {

    firebaseMessageId = childKey;
    messageData = childData;
    //Início do código
    console.log(firebaseMessageId);
    console.log(messageData);
    name = messageData['name'];
    message = messageData['message'];
    like = messageData['like'];
    nameWithTag = "<h4>" + name + "<img class='user_tick' src='tick_verificado.png'> </h4>";
    messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
    like_button = "<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";
    spanWithTag="<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span> </button> <hr>";
    row = nameWithTag + messageWithTag + like_button + spanWithTag;
    document.getElementById("output").innerHTML += row;
    //Fim do código
} });  }); }
getData();

function updateLike(message_id)
{
  console.log("clicked on like button - " + message_id);
	button_id = message_id;
	likes = document.getElementById(button_id).value;
	updated_likes = Number(likes) + 1;
	console.log(updated_likes);

	firebase.database().ref(roomName).child(message_id).update({
		like : updated_likes  
	 });

}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("index.html");
}
