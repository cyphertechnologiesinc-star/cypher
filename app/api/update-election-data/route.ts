import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Supabase configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const electionData = await request.json();

    // Check if record already exists
    const { data: existingData } = await supabase
      .from('election_data')
      .select('id')
      .limit(1)
      .single();

    let result;
    if (existingData?.id) {
      // Update existing record
      result = await supabase
        .from('election_data')
        .update({
          ...electionData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingData.id)
        .select();
    } else {
      // Insert new record
      result = await supabase
        .from('election_data')
        .insert([electionData])
        .select();
    }

    if (result.error) {
      throw result.error;
    }

    return NextResponse.json({
      success: true,
      message: 'Election data updated successfully',
      data: result.data?.[0],
    });
  } catch (error) {
    console.error('Error updating election data:', error);
    return NextResponse.json(
      { error: 'Failed to update election data' },
      { status: 500 }
    );
  }
}
