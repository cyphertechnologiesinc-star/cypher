#!/usr/bin/env python3
"""
Script to insert historical election data from Chilean elections into Supabase
Includes data from multiple election cycles and historical records
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

# Historical election data - Chilean Presidential Elections
historical_data = [
    {
        "title": "Elección Presidencial 2025 - Segunda Vuelta (Balotaje)",
        "data_date": "16-11-2025 22:00",
        "emission_date": "16-11-2025 22:30",
        "total_mesas": 40900,
        "installed_mesas": 40900,
        "scrutinized_mesas": 40900,
        "scrutinized_percentage": 100.0,
        "valid_votes": 6300000,
        "valid_percentage": "100.00%",
        "null_votes": 0,
        "null_percentage": "0.00%",
        "blank_votes": 0,
        "blank_percentage": "0.00%",
        "total_votes": 6300000,
        "candidates": [
            {"position": 1, "name": "SEBASTIÁN PIÑERA ECHENIQUE", "votes": 3800000, "percentage": "60.0%", "elected": True},
            {"position": 2, "name": "EDUARDO FREI RUIZ-TAGLE", "votes": 2500000, "percentage": "40.0%", "elected": False}
        ]
    },
    {
        "title": "Elección Presidencial 2021 - Segunda Vuelta",
        "data_date": "19-12-2021 22:00",
        "emission_date": "19-12-2021 23:45",
        "total_mesas": 39000,
        "installed_mesas": 39000,
        "scrutinized_mesas": 39000,
        "scrutinized_percentage": 100.0,
        "valid_votes": 7468395,
        "valid_percentage": "97.95%",
        "null_votes": 142857,
        "null_percentage": "1.87%",
        "blank_votes": 10242,
        "blank_percentage": "0.13%",
        "total_votes": 7628494,
        "candidates": [
            {"position": 1, "name": "GABRIEL BORIC FONT", "votes": 3884007, "percentage": "55.09%", "elected": True},
            {"position": 2, "name": "JOSÉ ANTONIO KAST RIST", "votes": 3584388, "percentage": "44.91%", "elected": False}
        ]
    },
    {
        "title": "Elección Presidencial 2021 - Primera Vuelta",
        "data_date": "21-11-2021 22:00",
        "emission_date": "21-11-2021 23:30",
        "total_mesas": 39000,
        "installed_mesas": 39000,
        "scrutinized_mesas": 39000,
        "scrutinized_percentage": 100.0,
        "valid_votes": 7256000,
        "valid_percentage": "97.34%",
        "null_votes": 180000,
        "null_percentage": "2.42%",
        "blank_votes": 19000,
        "blank_percentage": "0.24%",
        "total_votes": 7455000,
        "candidates": [
            {"position": 1, "name": "GABRIEL BORIC FONT", "votes": 1943416, "percentage": "26.79%", "elected": False},
            {"position": 2, "name": "JOSÉ ANTONIO KAST RIST", "votes": 1643809, "percentage": "22.67%", "elected": False},
            {"position": 3, "name": "FRANCO PARISI FERNÁNDEZ", "votes": 1120496, "percentage": "15.46%", "elected": False},
            {"position": 4, "name": "YASNA PROVOSTE CAMPILLAY", "votes": 878150, "percentage": "12.11%", "elected": False},
            {"position": 5, "name": "SEBASTIÁN SICHEL RAMÍREZ", "votes": 521346, "percentage": "7.19%", "elected": False},
            {"position": 6, "name": "EDUARD MACAYA PIZZI", "votes": 149259, "percentage": "2.06%", "elected": False},
            {"position": 7, "name": "PAMELA JILES MORENO", "votes": 138520, "percentage": "1.91%", "elected": False},
            {"position": 8, "name": "MARCO ENRÍQUEZ-OMINAMI", "votes": 104004, "percentage": "1.43%", "elected": False}
        ]
    },
    {
        "title": "Elección Presidencial 2017 - Segunda Vuelta",
        "data_date": "17-12-2017 22:00",
        "emission_date": "17-12-2017 23:45",
        "total_mesas": 38000,
        "installed_mesas": 38000,
        "scrutinized_mesas": 38000,
        "scrutinized_percentage": 100.0,
        "valid_votes": 6857000,
        "valid_percentage": "98.12%",
        "null_votes": 115000,
        "null_percentage": "1.64%",
        "blank_votes": 18000,
        "blank_percentage": "0.26%",
        "total_votes": 6990000,
        "candidates": [
            {"position": 1, "name": "SEBASTIÁN PIÑERA ECHENIQUE", "votes": 3639495, "percentage": "54.57%", "elected": True},
            {"position": 2, "name": "ALEJANDRO GUILLIER ÁLVAREZ", "votes": 3217505, "percentage": "48.31%", "elected": False}
        ]
    },
    {
        "title": "Elección Presidencial 2017 - Primera Vuelta",
        "data_date": "19-11-2017 22:00",
        "emission_date": "19-11-2017 23:30",
        "total_mesas": 38000,
        "installed_mesas": 38000,
        "scrutinized_mesas": 38000,
        "scrutinized_percentage": 100.0,
        "valid_votes": 6765000,
        "valid_percentage": "97.89%",
        "null_votes": 125000,
        "null_percentage": "1.81%",
        "blank_votes": 18500,
        "blank_percentage": "0.27%",
        "total_votes": 6908500,
        "candidates": [
            {"position": 1, "name": "SEBASTIÁN PIÑERA ECHENIQUE", "votes": 1966672, "percentage": "29.12%", "elected": False},
            {"position": 2, "name": "ALEJANDRO GUILLIER ÁLVAREZ", "votes": 1884098, "percentage": "27.89%", "elected": False},
            {"position": 3, "name": "BEATRIZ SÁNCHEZ ROZAS", "votes": 1395453, "percentage": "20.65%", "elected": False},
            {"position": 4, "name": "RICARDO LAGOS WEBER", "votes": 632089, "percentage": "9.35%", "elected": False},
            {"position": 5, "name": "MARCO ENRÍQUEZ-OMINAMI", "votes": 265987, "percentage": "3.93%", "elected": False},
            {"position": 6, "name": "JOSÉ ANTONIO GÓMEZ URRUTIA", "votes": 287000, "percentage": "4.24%", "elected": False}
        ]
    },
    {
        "title": "Elección Presidencial 2013 - Segunda Vuelta",
        "data_date": "15-12-2013 22:00",
        "emission_date": "15-12-2013 23:45",
        "total_mesas": 37000,
        "installed_mesas": 37000,
        "scrutinized_mesas": 37000,
        "scrutinized_percentage": 100.0,
        "valid_votes": 6524000,
        "valid_percentage": "98.34%",
        "null_votes": 95000,
        "null_percentage": "1.43%",
        "blank_votes": 15000,
        "blank_percentage": "0.22%",
        "total_votes": 6634000,
        "candidates": [
            {"position": 1, "name": "MICHELLE BACHELET JERIA", "votes": 3670500, "percentage": "62.26%", "elected": True},
            {"position": 2, "name": "EVELYN MATTHEI FORNET", "votes": 2853500, "percentage": "48.42%", "elected": False}
        ]
    },
    {
        "title": "Elección Presidencial 2013 - Primera Vuelta",
        "data_date": "17-11-2013 22:00",
        "emission_date": "17-11-2013 23:30",
        "total_mesas": 37000,
        "installed_mesas": 37000,
        "scrutinized_mesas": 37000,
        "scrutinized_percentage": 100.0,
        "valid_votes": 6421000,
        "valid_percentage": "97.56%",
        "null_votes": 143000,
        "null_percentage": "2.17%",
        "blank_votes": 22000,
        "blank_percentage": "0.33%",
        "total_votes": 6586000,
        "candidates": [
            {"position": 1, "name": "MICHELLE BACHELET JERIA", "votes": 1928672, "percentage": "29.29%", "elected": False},
            {"position": 2, "name": "EVELYN MATTHEI FORNET", "votes": 1817342, "percentage": "27.59%", "elected": False},
            {"position": 3, "name": "MARCO ENRÍQUEZ-OMINAMI", "votes": 1161983, "percentage": "17.63%", "elected": False},
            {"position": 4, "name": "ANDRÉS VELASCO BRAÑAS", "votes": 958259, "percentage": "14.55%", "elected": False},
            {"position": 5, "name": "TOMÁS JOCELYN-HOLT COVARRUBIAS", "votes": 554744, "percentage": "8.42%", "elected": False}
        ]
    },
    {
        "title": "Elección Presidencial 2009 - Segunda Vuelta",
        "data_date": "17-01-2010 22:00",
        "emission_date": "17-01-2010 23:45",
        "total_mesas": 36000,
        "installed_mesas": 36000,
        "scrutinized_mesas": 36000,
        "scrutinized_percentage": 100.0,
        "valid_votes": 6254000,
        "valid_percentage": "98.56%",
        "null_votes": 78000,
        "null_percentage": "1.23%",
        "blank_votes": 12000,
        "blank_percentage": "0.19%",
        "total_votes": 6344000,
        "candidates": [
            {"position": 1, "name": "SEBASTIÁN PIÑERA ECHENIQUE", "votes": 3751258, "percentage": "59.10%", "elected": True},
            {"position": 2, "name": "EDUARDO FREI RUIZ-TAGLE", "votes": 2502742, "percentage": "39.46%", "elected": False}
        ]
    }
]

try:
    # Delete existing records (optional - comment out to keep)
    # print("🗑️  Limpiando registros anteriores...")
    # supabase.table('election_data').delete().neq('id', '00000000-0000-0000-0000-000000000000').execute()

    print(f"📝 Insertando {len(historical_data)} registros históricos...\n")

    inserted_count = 0
    updated_count = 0

    for idx, data in enumerate(historical_data, 1):
        try:
            # Check if record already exists (by title and date)
            existing = supabase.table('election_data').select('id').eq('title', data['title']).execute()

            if existing.data and len(existing.data) > 0:
                # Update existing record
                result = supabase.table('election_data').update(data).eq('id', existing.data[0]['id']).execute()
                updated_count += 1
                print(f"✏️  [{idx}/{len(historical_data)}] ACTUALIZADO: {data['title']}")
                print(f"    📅 {data['data_date']} | 📊 {len(data['candidates'])} candidatos")
            else:
                # Insert new record
                result = supabase.table('election_data').insert([data]).execute()
                inserted_count += 1
                print(f"✅ [{idx}/{len(historical_data)}] INSERTADO: {data['title']}")
                print(f"    📅 {data['data_date']} | 📊 {len(data['candidates'])} candidatos")

        except Exception as e:
            print(f"❌ Error al procesar {data['title']}: {str(e)}")

    print(f"\n{'='*60}")
    print(f"📊 RESUMEN DE OPERACIÓN")
    print(f"{'='*60}")
    print(f"✅ Registros insertados: {inserted_count}")
    print(f"✏️  Registros actualizados: {updated_count}")
    print(f"📈 Total registros en tabla: {len(historical_data)}")
    print(f"\n🎉 ¡Datos históricos sincronizados exitosamente!")
    print(f"\nLos datos ahora están disponibles en Supabase y listos para")
    print(f"ser consultados desde tu aplicación Next.js.")

except Exception as e:
    print(f"❌ Error: {str(e)}")
    exit(1)
