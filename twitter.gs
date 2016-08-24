var CONSUMER_KEY = 'XXXX'; // Register your app with Twitter.
var CONSUMER_SECRET = 'XXXX'; // Register your app with Twitter.

function getTwitter() {  

 // Encode consumer key and secret
 var tokenUrl = "https://api.twitter.com/oauth2/token";
 var tokenCredential = Utilities.base64EncodeWebSafe(
   CONSUMER_KEY + ":" + CONSUMER_SECRET);

 //  Obtain a bearer token with HTTP POST request
 var tokenOptions = {
   headers : {
     Authorization: "Basic " + tokenCredential,
     "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" 
   },
   method: "post",
   payload: "grant_type=client_credentials"
 };

 var responseToken = UrlFetchApp.fetch(tokenUrl, tokenOptions);
 var parsedToken = JSON.parse(responseToken);
 var token = parsedToken.access_token;
  
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var sheet = ss.getSheetByName("Twitter"); // Name of your sheet
  var datarange = sheet.getDataRange();
   var numRows = datarange.getNumRows();
  
  for (var i=4; i <= numRows; i++){

 // Authenticate Twitter API requests with the bearer token
 var apiUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=' + sheet.getRange(i, 2).getValue();
 var apiOptions = {
   headers : {
     Authorization: 'Bearer ' + token
   },
   "method" : "get"
 };

    try {
    
 var responseApi = UrlFetchApp.fetch(apiUrl, apiOptions);

 if (responseApi.getResponseCode() == 200) {

   // Parse the JSON encoded Twitter API response
   var tweets = JSON.parse(responseApi.getContentText());
   
  //set follower count
  var cell = sheet.getRange(i,4).setValue(tweets.followers_count);
  
   //set total tweets
   var cell2 = sheet.getRange(i,6).setValue(tweets.statuses_count);
   
   //set account created date
   var date = new Date(tweets.created_at);
   var formattedDate = Utilities.formatDate(date, "GMT", "dd/MM/yyyy");
   var cell3 = sheet.getRange(i,7).setValue(formattedDate);
   
   }
      
      } catch (e)  {
   // account not found, output suitable message
        var cell = sheet.getRange(i,4).setValue("Not found");
        var cell2 = sheet.getRange(i,6).setValue("Not found");
        var cell3 = sheet.getRange(i,7).setValue("Not found");
 }
    
   //update a cell with the Last Updated Date
var cell1 = sheet.getRange("C1").setValue("Last updated: " + Utilities.formatDate(new Date(), "GMT", "dd/MM/yyyy"));
 }

}
