// Create Azure Account - https://azure.microsoft.com/en-us/free/free-account-students-faq/
// Retrieve API Key - https://azure.microsoft.com/en-ca/try/cognitive-services/


//5,000 transactions, 20 per minute.
//Endpoint: https://westcentralus.api.cognitive.microsoft.com/vision/v1.0

//Key 1: 49005b80d0434eb3876d928eb039e11a

//Key 2: 520951618b104e9590fd283df74b28f1

// API Documentation - https://westus.dev.cognitive.microsoft.com/docs/services/TextAnalytics.V2.0/operations/56f30ceeeda5650db055a3c9
function submitComment(commentControl) {

  var comments = document.getElementsByName(commentControl)[0].value;
  var url = "https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";
  var apiKey = "b687d3ed400b431f9b8a32775d004e15";

  var body = {
    "documents": [
      {
        "language": "en-US",
        "id": "1",
        "text": comments
      }
    ]
  }

  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(body),
    processData: false,
    headers: {
      "Ocp-Apim-Subscription-Key": apiKey,
      "Content-Type": "application/json"
    }
  }).done(function(result){
    var sentimentRating = Math.round((result.documents[0].score * 100)/ 25) + 1;
    var currentItemId = JSON.parse(localStorage.getItem('currentItemId'));
    window.location.href = '/comments?classId=' + currentItemId + '&rating=' + sentimentRating + '&comments=' + comments;
  }).fail(function(xhr, status, err) {
    alert(err);
  });//add error handling
}

function navigateToComments(classId) {
  localStorage.setItem('currentItemId', JSON.stringify(classId));
  window.location.href = 'comments?classId=' + classId;
}
