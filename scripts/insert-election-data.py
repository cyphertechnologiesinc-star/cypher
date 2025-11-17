#!/usr/bin/env python3
"""
Script to insert election data from SERVEL into Supabase
"""

import os
import json
from datetime import datetime
from supabase import create_client, Client

# Get Supabase credentials from environment
supabase_url = os.environ.get('NEXT_PUBLIC_SUPABASE_URL')
supabase_key = os.environ.get('SUPABASE_SERVICE_KEY')

if not supabase_url or not supabase_key:
    print("❌ Error: Missing Supabase environment variables")
    print("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY")
    exit(1)

# Initialize Supabase client
supabase: Client = create_client(supabase_url, supabase_key)

# Election data from SERVEL - Primera Vuelta 17-11-2025
election_data = {
    "title": "Resultado Elección de Presidente",
    "data_date": "17-11-2025 18:30",
    "emission_date": "17-11-2025 18:35",
    "total_mesas": 40900,
    "installed_mesas": 40900,
    "scrutinized_mesas": 25669,
    "scrutinized_percentage": 62.76,
    "valid_votes": 8055810,
    "valid_percentage": "97.28%",
    "null_votes": 217678,
    "null_percentage": "2.60%",
    "blank_votes": 86690,
    "blank_percentage": "1.04%",
    "total_votes": 8360578,
    "candidates": [
        {
            "position": 1,
            "name": "JEANNETTE JARA ROMAN",
            "votes": 2145203,
            "percentage": "26.63%",
            "elected": False
        },
        {
            "position": 2,
            "name": "JOSE ANTONIO KAST RIST",
            "votes": 1953810,
            "percentage": "24.25%",
            "elected": False
        },
        {
            "position": 3,
            "name": "FRANCO PARISI FERNANDEZ",
            "votes": 1534310,
            "percentage": "19.05%",
            "elected": False
        },
        {
            "position": 4,
            "name": "JOHANNES KAISER BARENTS-VON HOHENHAGEN",
            "votes": 1122799,
            "percentage": "13.94%",
            "elected": False
        },
        {
            "position": 5,
            "name": "EVELYN MATTHEI FORNET",
            "votes": 1050521,
            "percentage": "13.04%",
            "elected": False
        },
        {
            "position": 6,
            "name": "MARCO ANTONIO ENRIQUEZ-OMINAMI GUMUCIO",
            "votes": 93953,
            "percentage": "1.17%",
            "elected": False
        },
        {
            "position": 7,
            "name": "HAROLD MAYNE-NICHOLLS SECUL",
            "votes": 102504,
            "percentage": "1.27%",
            "elected": False
        },
        {
            "position": 8,
            "name": "EDUARDO ANTONIO ARTES BRICHETTI",
            "votes": 53110,
            "percentage": "0.66%",
            "elected": False
        }
    ]
}

try:
    # Check if record already exists
    existing = supabase.table('election_data').select('*').execute()

    if existing.data and len(existing.data) > 0:
        # Update existing record
        print("📝 Updating existing election data...")
        result = supabase.table('election_data').update(election_data).eq('id', existing.data[0]['id']).execute()
        print(f"✅ Updated election data with ID: {existing.data[0]['id']}")
    else:
        # Insert new record
        print("📝 Inserting new election data...")
        result = supabase.table('election_data').insert(election_data).execute()
        print(f"✅ Inserted election data")

    print("\n📊 Data Summary:")
    print(f"   - Title: {election_data['title']}")
    print(f"   - Date: {election_data['data_date']}")
    print(f"   - Candidates: {len(election_data['candidates'])}")
    print(f"   - Total Votes: {election_data['total_votes']:,}")
    print(f"   - Scrutinized: {election_data['scrutinized_percentage']}%")
    print("\n✅ Success! Data is now available in Supabase")

except Exception as e:
    print(f"❌ Error: {str(e)}")
    exit(1)
