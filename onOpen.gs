/**
 * This runs when the spreadsheet is opened (onOpen).
 * Place this in onOpen.gs to create a new menu
*/

function onOpen() {
  
  // First, we need a reference to the active spreadsheet
  var ui = SpreadsheetApp.getUi();

ui.createMenu('Social Media Menu')
      .addItem('Update Twitter', 'menuItem1')
      .addSeparator()
      .addItem('Update Facebook', 'menuItem2')
      .addToUi();
}


function menuItem1() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
     getTwitter();
}

function menuItem2() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
     getFacebook();
}
