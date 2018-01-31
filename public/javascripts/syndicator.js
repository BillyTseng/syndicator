// Initiates an Ajax call to a POST endpoint for sign in
function sendReqForCreateEvent() {
  var eventName = document.getElementById("eventName").value;
  var description = document.getElementById("description").value;
  var startDate = document.getElementById("startDate").value;
  var endDate = document.getElementById("endDate").value;
  var price = document.getElementById("price").value;

  // Create the XMLHttpRequest object, register the load event
  // listener, and set the response type to JSON
  var xhr = new XMLHttpRequest();

  xhr.addEventListener("load", createEventResponse);
  xhr.responseType = "json";
  xhr.open("POST", '/events/create');
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(JSON.stringify({
    eventName:eventName,
    description:description,
    startDate:startDate,
    endDate:endDate,
    price:price
  }));
}

// Process response from sign in attempt
function createEventResponse() {
  var responseDiv = $('#ServerResponse');
  var responseHTML = "";

  // 200 is the response code for a successful GET request
  if (this.status === 201) {
    responseDiv.removeClass('alert-danger');
    responseDiv.addClass('alert-success');
    responseHTML = "Create Event Success";
    sendReqForAllRecord()
  } else {
    responseHTML = "Error: " + this.response.message;
  }

  // Update the response div in the webpage and make it visible
  responseDiv.show();
  responseDiv.html(responseHTML);
}

// Handle authentication on page load
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("submit").addEventListener("click", sendReqForCreateEvent);
});

function sendReqForAllRecord() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", allRecordResponse);
    xhr.responseType = "json";
    xhr.open("GET", '/events');
    xhr.send();
}

function allRecordResponse() {
    var responseDiv = document.getElementById('getTable');
    var responseHTML;

    // 200 is the response code for a successful GET request
    if (this.status === 200) {
        responseHTML = '<table class="table">';
        responseHTML += '<tr><th>Event Name</th><th>Description</th><th>Start Date</th>' +
                            '<th>End Date</th><th>Price</th><th>Posted</th><th>Submitted Time</th></tr>';
        for (var rec of this.response.record) {
          responseHTML += '<tr><td>' + rec.name + '</td><td>' + rec.description + '</td>';
          responseHTML += '<td>' + rec.startDate + '</td><td>' + rec.endDate + '</td>';
          responseHTML += '<td>' + rec.price + '</td><td>' + rec.posted + '</td>';
          responseHTML += '<td>' + rec.submitTime + '</td></tr>';
        }
        responseHTML += "</table>"
    } else {
        responseHTML = "<span>";
        responseHTML += "Error: " + this.response.message;
        responseHTML += "</span>"
    }

    // Update the response div in the webpage and make it visible
    responseDiv.style.display = "block";
    responseDiv.innerHTML = responseHTML;
}

sendReqForAllRecord();
