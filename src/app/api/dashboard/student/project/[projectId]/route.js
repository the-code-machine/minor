import { connectDb } from '@/dbConnection/db';
import projectModel from '@/models/project.model';
import { NextResponse, NextRequest } from 'next/server';

connectDb()
export async function PUT(req, { params }) {
   
  
    const projectId = params.projectId;
    const updateData = await req.json();
  
    try {
      let project = await projectModel.findOne({ projectId });
  
      if (project) {
        // Project exists, update it
        for (const key in updateData) {
          if (updateData.hasOwnProperty(key)) {
            project[key] = updateData[key];
          }
        }
        await project.save();
        return NextResponse.json({ message: 'Project updated successfully', project }, { status: 200 });
      } else {
        // Project does not exist, create it
        project = new projectModel({ projectId, ...updateData });
        await project.save();
        return NextResponse.json({ message: 'Project created successfully', project }, { status: 201 });
      }
    } catch (error) {
      console.error('Error processing project:', error);
      return NextResponse.json({ message: 'Error processing project', error }, { status: 500 });
    }
  }
  
    export async function GET(req, { params }) {
    const projectId = params.projectId;

    try {
      const project = await projectModel.findOne({ projectId });
        if (project) {
            return NextResponse.json({ project }, { status: 201 });
        } else {
            return NextResponse.json({ message: 'Project not found' }, { status: 404 });
        }   
    }
    catch (error) {
        console.error('Error fetching project:', error);
        return NextResponse.json({ message: 'Error fetching project', error }, { status: 500 });
    }
}
