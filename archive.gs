/** runArchive() is called by monthly schedule to copy the followers/likes to corresponding Archive sheet **/

function runArchive() {
  
   var ss = SpreadsheetApp.getActiveSpreadsheet();   
  
  storeTwitterFollowers(ss);
   
  storeFBLikes(ss);  
  
}

function storeTwitterFollowers(ss) {
  
  /**
  //Twitter 
  */
  
  var source_sheet = ss.getSheetByName("Twitter");
var target_sheet = ss.getSheetByName("Twitter Archive");
  
  //insert new column for latest monthly update
  target_sheet.insertColumns(4, 1);
  
  //
  var datarange = source_sheet.getDataRange();
    var numRows = datarange.getNumRows();

  var source_range = source_sheet.getRange("D4:D" + numRows);
var target_range = target_sheet.getRange("D4:D" + numRows);
  
  source_range.copyTo(target_range);
  
  target_sheet.getRange("D3").setValue(new Date());
}

function storeFBLikes(ss) {
  
  /**
  //Facebook
  */
  
  var source_sheet = ss.getSheetByName("Facebook");
var target_sheet = ss.getSheetByName("Facebook Archive");
  
  //insert new column for latest monthly update
  target_sheet.insertColumns(3, 1);

  var datarange = source_sheet.getDataRange();
    var numRows = datarange.getNumRows();

  var source_range = source_sheet.getRange("C4:C" + numRows);
var target_range = target_sheet.getRange("C4:C" + numRows);
  
  source_range.copyTo(target_range);
  
  target_sheet.getRange("C3").setValue(new Date());
 
}
