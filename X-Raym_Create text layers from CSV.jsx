/**
 * AEScript Name: Create Text Layers from CSV
 * Author: X-Raym
 * Author URI: https://www.extremraym.com
 * Repository: Gist > X-Raym
 * Licence: GPL v3
 * Version: 1.0
**/

/**
 * Changelog:
 * v1.0 (2021-09-06)
  + Initial Release
**/

/**
 * Instructions
 * - First line of the CSV is CSV header
 * - Expected columns are at least Name, Time in in seconds, Time out in seconds
 * - Change columns ID based on your CSV 
**/

scriptName = "Create text layers from CSV";

{

  // create undo group

  app.beginUndoGroup("Create Text Layers From File");

  // Prompt user to select text file

  var myFile = File.openDialog();
  if (myFile != null && myFile.open("r")) {

    // open file
    var content = myFile.read();
    file.close();

    if (content){
      var activeItem = app.project.activeItem;
			if ((activeItem == null) || !(activeItem instanceof CompItem)) {
				alert("Please select or open a composition first.", scriptName);
			} else {

        var activeComp = activeItem;

        var lines = content.split('\n');
        for(var i = 1;i < lines.length;i++){ // 1 is for header
          var columns = lines[i].split('\t');
          if( columns.length >= 6) {
            var layer = activeComp.layers.addText(columns[6].replace(/"/g, ''));
            layer.inPoint = columns[2];
            layer.outPoint = columns[3];
          }
        }

      // close the file before exiting
     }
    }else{
      alert("File open failed!");
    }

  }else{
    alert("No text file selected.");
  }

  app.endUndoGroup();
}
