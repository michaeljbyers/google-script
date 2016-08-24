var APP_ID = 'XXXX'; // register your app with Facebook
var APP_SECRET = 'XXXX'; // register your app with Facebook

function getFacebook() {

var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var sheet = ss.getSheetByName("Facebook"); //your sheet name
  var datarange = sheet.getDataRange();
   var numRows = datarange.getNumRows();
  
  for (var i=4; i <= numRows; i++){

var responseToken = UrlFetchApp.fetch("https://graph.facebook.com/" +  sheet.getRange(i, 2).getValue() + "/?fields=fan_count,name&access_token=1214034118636180%7Cd8WNz8do8QpRXL05aMqb6mE3MNw");
  
 var parsedToken = JSON.parse(responseToken);

//set follower count
  var cell = sheet.getRange(i,4).setValue(parsedToken.fan_count);
  
   //set total tweets
   var cell2 = sheet.getRange(i,6).setValue(parsedToken.name);
   
   //set account created date
   //var date = new Date(tweets.created_at);
   //var formattedDate = Utilities.formatDate(date, "GMT", "dd/MM/yyyy");
   //var cell3 = sheet.getRange(i,7).setValue(formattedDate);

}
  //update a cell with the Last Updated date;
  var cell1 = sheet.getRange("C1").setValue("Last updated: " + Utilities.formatDate(new Date(), "GMT", "dd/MM/yyyy"));
}
