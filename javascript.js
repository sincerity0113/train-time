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
  var firstTrainTime  = $("#first-train-input").val().trim(); 
  var frequency = $("#frequency-input").val().trim();
 
  var addTrain = {
    name: trainName,
    finishLine: destination,
    start: firstTrainTime,
    often: frequency
  }; 

  database.ref().push(addTrain);

  //console.log(addTrain.name);
  //console.log(addTrain.destination);
  //console.log(addTrain.start);
  //console.log(addTrain.often);

  var trainName = $("#train-name-input").val("");
  var destination = $("#destination-input").val("");
  var firstTrainTime = $("#first-train-input").val("");
  var frequency = $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {

  //console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().finishLine;
  var firstTrainTime = childSnapshot.val().start;
  var frequency = childSnapshot.val().often;

  //console.log(trainName);
  //console.log(destination);
  //console.log(firstTrainTime);
  //console.log(frequency);

  var numberOneTrain = moment(firstTrainTime, "HH:mm").subtract(1,"weeks");
  var timeGap = moment().diff(moment(numberOneTrain),"minutes");
  var timeToCome = timeGap % frequency;
  var minutesAway = frequency - timeToCome;
  var nextArrival = moment().add(minutesAway,"minutes").format("HH:mm");

  //var nextArrival = moment().diff(moment(, "X"), "months");
  

 // var minutesAway = current time - next traim coming time



  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)
  );


  $("#train-time-table > tbody").append(newRow);
});

