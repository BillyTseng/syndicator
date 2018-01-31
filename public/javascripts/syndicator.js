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
