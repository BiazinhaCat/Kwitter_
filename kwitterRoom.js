
//ADICIONE SEUS LINKS FIREBASE
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

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom()
{
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose : "adicionar nome de sala"
  });

    localStorage.setItem("roomName", roomName);//
    
    window.location = "kwitterPage.html";
}

function getData() {  
  
  firebase.database().ref("/").on('value', function(snapshot) { 
    document.getElementById("output").innerHTML = ""; 
    snapshot.forEach(function(childSnapshot) { 
    childKey  = childSnapshot.key;
       roomNames = childKey;
       console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("roomName", name);
    window.location = "kwitterPage.html";
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
    window.location = "index.html";
}
