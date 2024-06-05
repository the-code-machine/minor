import mongoose from 'mongoose';

const { Schema } = mongoose;

const workDocumentSchema = new Schema({
  work: String,
  documentUrl: String,
});

const roleSchema = new Schema({
  projectManager: [workDocumentSchema],
  designer: [workDocumentSchema],
  tester: [workDocumentSchema],
  developer: [workDocumentSchema],
});

const projectSchema = new Schema({
  projectId: { type: String, unique: true, required: true },
  title: { type: String},
  description: String,
  mentorId: String,
  leaderId: String,
  synopsis: roleSchema,
  implementation: roleSchema,
  deployment: roleSchema,
  testing: roleSchema,
  finalReport: roleSchema,
  SynopisDocument: String,
  ImplementationDocument: String,
  DeploymentDocument: String,
  TestingDocument: String,
  FinalReportDocument: String,
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
