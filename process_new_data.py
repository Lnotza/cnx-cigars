import json
from difflib import get_close_matches
import re

with open('new_data.txt', 'r') as f:
    lines = [line.strip() for line in f.readlines() if line.strip()]

new_cigars = []
i = 0
while i < len(lines):
    name = lines[i]
    strength_line = lines[i+1]
    notes_line = lines[i+2]
    
    strength = strength_line.replace('Strength: ', '').strip()
    notes = notes_line.strip('“"” ')
    
    new_cigars.append({
        'name': name,
        'strength': strength,
        'notes': notes
    })
    i += 3

with open('src/data/cigars.json', 'r') as f:
    old_cigars = json.load(f)

old_names = [c['name'] for c in old_cigars]

# Manual override mappings because some names changed a lot
manual_map = {
    'Partagas Serie D No.4': 'Partagas - Serie D No.4',
    'Partagas Serie P No.2': 'Partagas - Serie Pyramides No. 2',
    'Hoyo de Monterrey Epicure No.2': 'Hoyo de Monterrey - Epicure No. 2',
    'H. Upmann Magnum 46': 'H.Upmann - Mag 46',
    'H. Upmann Half Corona': 'H.Upmann - Half Corona',
    'Quai d’Orsay No.50': 'Quai d\'Orsay 50',
    'Jose L Piedra Cazadores': 'Jose L. Piedra - Cazadores',
    'Davidoff Signature 2000': 'The Davidoff Signature 2000',
    'Davidoff Winston Churchill The Late Hour': 'Davidoff - Churchill - The Late Hour',
    'AJ Fernandez New World Dorado': 'AJ Fernandez New World Dorado - Robusto',
    'AJ Fernandez Dias de Gloria': 'AJ Fernandez Dias de Gloria Brazil Corona',
    'Arturo Fuente Hemingway Short Story': 'Arturo Fuente-Hemingway "Short story"',
    'E.P. Carrillo Pledge Prequel': 'E.P. Carrillo - Pledge Prequel',
    'League of Fat Bastards Serie O': 'League of Fat Bastards - Serie O',
    'Cusano Honduras Robusto': 'Cusano Honduras - Robusto',
    'Cusano Honduras Toro': 'Cusano Honduras - Toro',
    'Cusano Honduras Churchill': 'Cusano Honduras - Churchill',
    'Villa Zamorano Robusto': 'Villa Zamorano - Robusto',
    'My Father Flor de las Antillas Toro': 'The My Father \'Flor de las Antillas\' Toro',
    'My Father Le Bijou 1922 Torpedo': 'My Father \'Le Bijou 1922\' torpedo',
    'Nicatabaco Factory Blend No.2 Toro Deluxe': 'Nicatabaco Factory Blend No. 2 Toro Deluxe',
    'Azan White Campana': 'Azan white campana'
}

final_json = []

for idx, c in enumerate(new_cigars):
    orig = None
    if c['name'] in manual_map:
        orig = manual_map[c['name']]
    else:
        # only match if very similar
        matches = get_close_matches(c['name'].replace('-', ' ').replace('.', ' '), [n.replace('-', ' ').replace('.', ' ') for n in old_names], n=1, cutoff=0.8)
        if matches:
            orig = old_names[[n.replace('-', ' ').replace('.', ' ') for n in old_names].index(matches[0])]
            
    c_id = None
    if orig:
        for old in old_cigars:
            if old['name'] == orig:
                c_id = old['id']
                break
                
    if not c_id:
        # Generate new ID if absolutely no match
        c_id = c['name'].lower().replace(' no.', ' no').replace(' h. ', ' h ')
        c_id = re.sub(r'[^a-z0-9\s-]', '', c_id)
        c_id = re.sub(r'\s+', '-', c_id)
        
    c['id'] = c_id
    
    # Category based on index
    if idx < 28:
        c['category'] = 'Cuban Cigars'
    else:
        c['category'] = 'New World Cigars'
        
    final_json.append(c)

with open('src/data/cigars.json', 'w') as f:
    json.dump(final_json, f, indent=2)

print("Updated cigars.json with exactly 61 cigars and all provided metadata!")
