



var firebaseConfig = {
  apiKey: "AIzaSyD8j9IFpWnVE4KkLH2VNjTjcyntgHy-7bI",
  authDomain: "traintime-d2628.firebaseapp.com",
  databaseURL: "https://traintime-d2628.firebaseio.com",
  projectId: "traintime-d2628",
  storageBucket: "traintime-d2628.appspot.com",
  messagingSenderId: "894399505942",
  appId: "1:894399505942:web:354b7a40af3c739b"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-button").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrainTime  = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();
 
  var addTrain = {
    name: trainName,
    destination: destination,
    start: firstTrainTime,
    often: frequency
  }; rate

  database.ref().push(addTrain);

  console.log(addTrain.name);
  console.log(addTrain.destination);
  console.log(addTrain.start);
  console.log(addTrain.often);

  alert("New Train Added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().start;
  var frequency = childSnapshot.val().rate;

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  var dayOfStart = moment.unix(firstTrainTime).format("HH:mm");

  //var nextArrival = moment().diff(moment(, "X"), "months");
  

 // var minutesAway = current time - next traim coming time



  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)
  );


  $("#employee-table > tbody").append(newRow);
});

