
import { NextResponse } from 'next/server';
import { connectDb } from '@/dbConnection/db';
import Contact from '@/models/contact';
 connectDb();
export async function POST(request) {
    const reqBod = await request.json();

 const {formData} = reqBod;

      try {
        const contact = new Contact(formData);
        await contact.save();
        return NextResponse.json({ success: true, data: contact });
      } catch (error) {
        return NextResponse.json({ success: false });
      }

  }
