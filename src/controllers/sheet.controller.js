const { MentorStudentExaminer ,StudentExaminer} = require('../models/sheet.model'); // Your model function

const saveSheetDataMentor = async (sheetName, editedCell, newValue, allData) => {
 if (!sheetName || !allData) {
    return { error: 'Sheet name and data are required' ,status:400}
  }

  try {
    const SheetModel = MentorStudentExaminer // Get or create the model

    // Use the first row as headers and identify a unique key
    const uniqueKey = "Timestamp"; // Adjust to your unique identifier
    const headerIndex = allData[0].indexOf(uniqueKey);

    if (headerIndex === -1) {
      return { error: 'Unique key not found in headers' ,status:400}
    }

    // Loop through the data and insert or update documents
    for (let i = 1; i < allData.length; i++) {
      const row = allData[i];
      const uniqueValue = row[headerIndex]; // Unique key value

      await SheetModel.findOneAndUpdate(
        { [uniqueKey]: uniqueValue }, // Search condition
        {
          $set: {
            editedCell,
            newValue,
            data: row, // The row data to update
          },
        },
        { upsert: true, new: true } // Insert if not found, update if found
      );
    }

    return { message: 'Data updated successfully' ,status:201}
  } catch (error) {
    console.error('Error updating sheet data:', error);
    return { error: 'Internal Server Error' ,status:500}
  }
};
const saveSheetDataExaminer = async (sheetName, editedCell, newValue, allData) => {

  if (!sheetName || !allData) {
    return { error: 'Sheet name and data are required' ,status:400}
  }

  try {
    const SheetModel = StudentExaminer // Get or create the model

    // Use the first row as headers and identify a unique key
    const uniqueKey = "Timestamp"; // Adjust to your unique identifier
    const headerIndex = allData[0].indexOf(uniqueKey);

    if (headerIndex === -1) {
      return { error: 'Unique key not found in headers' ,status:400}
    }

    // Loop through the data and insert or update documents
    for (let i = 1; i < allData.length; i++) {
      const row = allData[i];
      const uniqueValue = row[headerIndex]; // Unique key value

      await SheetModel.findOneAndUpdate(
        { [uniqueKey]: uniqueValue }, // Search condition
        {
          $set: {
            editedCell,
            newValue,
            data: row, // The row data to update
          },
        },
        { upsert: true, new: true } // Insert if not found, update if found
      );
    }

    return { message: 'Data updated successfully' ,status:201}
  } catch (error) {
    console.error('Error updating sheet data:', error);
    return { error: 'Internal Server Error' ,status:500}
  }
};

export  { saveSheetDataMentor ,saveSheetDataExaminer};
