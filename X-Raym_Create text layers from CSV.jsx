/**
 * AEScript Name: Create Text Layers from CSV
 * Author: X-Raym
 * Author URI: https://www.extremraym.com
 * Repository: Gist > X-Raym > Create Text Layers from CSV - After Effects Script
 * Licence: GPL v3
 * Version: 1.1
 * About: Based on https://www.motionscript.com/ae-scripting/create-text-layers-from-file.html
 **/

/**
 * Changelog:
 * v1.1 (2023-09-06)
  + Add Comp Markers
  # convert <br> in names to breaklines
 * v1.0.1 (2021-09-07)
  # file close fix
 * v1.0 (2021-09-06)
  + Initial Release
**/

/**
 * Instructions
 * - First line of the CSV is CSV header
 * - Expected columns are at least Name, Time in in seconds, Time out in seconds
 * - Change columns ID based on your CSV
 **/
{

  var scriptName = "Create text layers from CSV";

  // Create undo group
  app.beginUndoGroup("Create Text Layers From File");

  // Prompt user to select text file
  var myFile = File.openDialog();
  if (myFile != null && myFile.open("r")) {

      // Read file
      var content = myFile.read();
      myFile.close();

      if (content) {
          var activeItem = app.project.activeItem;
          if ((activeItem == null) || !(activeItem instanceof CompItem)) {
              alert("Please select or open a composition first.", scriptName);
          } else {

              var activeComp = activeItem;

              var lines = content.split('\n');
              for (var i = 1; i < lines.length; i++) { // 1 is for header line
                  var columns = lines[i].split('\t'); // CSV Separator
                  if (columns.length >= 6) { // The number of columns of the CSV
                      var text = columns[6].replace(/"/g, '').replace(/<br>/g, '\n'); // remove quotes / convert break lines
                      // Add Text Layer
                      var layer = activeComp.layers.addText(text);
                      layer.inPoint = columns[2];
                      layer.outPoint = columns[3];
                      // Add Comp Marker
                      var myMarker = new MarkerValue(text);
                      myMarker.duration = columns[3] - columns[2];
                      activeComp.markerProperty.setValueAtTime(columns[2], myMarker);
                  }
              }
          }
      } else {
          alert("File open failed!");
      }

  } else {
      alert("No text file selected.");
  }

  app.endUndoGroup();
}