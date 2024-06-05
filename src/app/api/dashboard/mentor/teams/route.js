import { connectDb } from '@/dbConnection/db';
import projectModel from '@/models/project.model';
import { NextResponse, NextRequest } from 'next/server';

connectDb()
  
    export async function GET(request ) {

        try {
            const teams = await projectModel.find({});
            if (teams.length > 0) {
              return NextResponse.json({ teams }, { status: 200 });
            } else {
              return NextResponse.json({ message: 'No teams found' }, { status: 404 });
            }   
          }
    catch (error) {
        console.error('Error fetching teams:', error);
        return NextResponse.json({ message: 'Error fetching teams', error }, { status: 500 });
    }
}
