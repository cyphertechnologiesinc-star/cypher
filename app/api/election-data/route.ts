import { NextRequest, NextResponse } from 'next/server';
import { parseElectionExcelFromPath } from '@/lib/excel-parser';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    // Try to find the Excel file in the project root
    const excelFileName = 'Presidente Total Votación - NACIONAL Y EN EL EXTRANJERO.xlsx';
    const filePath = path.join(process.cwd(), excelFileName);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'No election data file found' }, { status: 404 });
    }

    const electionData = await parseElectionExcelFromPath(filePath);
    return NextResponse.json(electionData);
  } catch (error) {
    console.error('Error loading election data:', error);
    return NextResponse.json(
      { error: 'Failed to load election data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file temporarily
    const fileName = 'Presidente Total Votación - NACIONAL Y EN EL EXTRANJERO.xlsx';
    const filePath = path.join(process.cwd(), fileName);

    // Write file
    fs.writeFileSync(filePath, buffer);

    // Parse the file
    const electionData = await parseElectionExcelFromPath(filePath);

    return NextResponse.json(electionData);
  } catch (error) {
    console.error('Error processing election data:', error);
    return NextResponse.json(
      { error: 'Failed to process election data' },
      { status: 500 }
    );
  }
}
