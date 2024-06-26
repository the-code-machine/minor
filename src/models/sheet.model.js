const mongoose = require('mongoose');

// A schema with flexibility in fields (you can also use `mixed` type for more freedom)
const sheetDataSchema = new mongoose.Schema({
  editedCell: String, // A1 notation of the edited cell
  newValue: String, // The new value after editing
  data: [[String]], // The entire row data, represented as an array of arrays
}, { strict: false }); // Setting strict mode to false allows extra fields




const MentorStudentExaminer = mongoose.models.MentorStudentExaminer || mongoose.model('MentorStudentExaminer', sheetDataSchema);
const StudentExaminer = mongoose.models.StudentExaminer || mongoose.model('StudentExaminer', sheetDataSchema);

export { MentorStudentExaminer, StudentExaminer };


  
