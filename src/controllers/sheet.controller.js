const { MentorStudentExaminer ,StudentExaminer} = require('../models/sheet.model'); // Your model function

const saveSheetDataMentor = async (req, res) => {
  const { sheetName, editedCell, newValue, allData } = req.body;

  if (!sheetName || !allData) {
    return res.status(400).json({ error: 'Sheet name and data are required' });
  }

  try {
    const SheetModel = MentorStudentExaminer // Get or create the model

    // Use the first row as headers and identify a unique key
    const uniqueKey = "Timestamp"; // Adjust to your unique identifier
    const headerIndex = allData[0].indexOf(uniqueKey);

    if (headerIndex === -1) {
      return res.status(400).json({ error: 'Unique key not found in headers' });
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

    return res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating sheet data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
const saveSheetDataExaminer = async (req, res) => {
  const { sheetName, editedCell, newValue, allData } = req.body;

  if (!sheetName || !allData) {
    return res.status(400).json({ error: 'Sheet name and data are required' });
  }

  try {
    const SheetModel = StudentExaminer // Get or create the model

    // Use the first row as headers and identify a unique key
    const uniqueKey = "Timestamp"; // Adjust to your unique identifier
    const headerIndex = allData[0].indexOf(uniqueKey);

    if (headerIndex === -1) {
      return res.status(400).json({ error: 'Unique key not found in headers' });
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

    return res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating sheet data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { saveSheetDataMentor ,saveSheetDataExaminer};
