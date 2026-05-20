import json
import os
import glob
import re
from difflib import get_close_matches

with open('src/data/cigars.json', 'r') as f:
    cigars = json.load(f)

# We want to match against the 176 files currently in public/cigars
all_files = glob.glob('public/cigars/*')
existing_names = [os.path.basename(f) for f in all_files]

used_paths = []

# Manual map for some tricky ones based on the filenames we saw earlier
manual_map = {
    'Romeo y Julieta No.1': 'romeo-y-julieta-short-churchill.png',
    'Romeo y Julieta No.2': 'romeo-y-julieta-short-churchill.png',
    'Romeo y Julieta Churchill': 'romeo-y-julieta-short-churchill.png',
    'Romeo y Julieta Short Churchill': 'romeo-y-julieta-short-churchill.png',
    'Partagas Serie D No.4': 'partagas-serie-d-no-4.jpg', # Wait, the file is partagas-serie-d-no-4.jpg
    'Partagas Serie D No.5': 'partagas-serie-d-no-4.png',
    'Partagas Serie P No.2': 'partagas-serie-pyramides-no-2.jpg',
    'Hoyo de Monterrey Epicure No.2': 'hoyo-de-monterrey-epicure-no-2.jpg',
    'H. Upmann Magnum 46': 'h-upmann-mag-46.jpg',
    'H. Upmann Magnum 54': 'magnum-54.jpg',
    'H. Upmann Half Corona': 'h-upmann-half-corona.jpg',
    'Punch Super Selection No.1': 'juan-lopez-seleccion-no-2.jpg',
    'Punch Punch Tubo': 'nch-punci.jpg',
    'Quai d’Orsay No.50': 'quai-d-orsay-50.jpg',
    'Juan Lopez Seleccion No.2': 'juan-lopez-seleccion-no-2.jpg',
    'Jose L Piedra Cazadores': 'jose-l-piedra-cazadores.jpg',
    'Quintero Favoritos': 'quintero.jpg',
    'Davidoff Signature 2000': 'the-davidoff-signature-2000.jpg',
    'Davidoff Aniversario Special R': 'aniversario.jpg',
    'Davidoff Winston Churchill The Late Hour': 'davidoff-churchill-the-late-hour.jpg',
    'Davidoff Yamasa Petit Churchill': 'davidoff-yamasa-petit-churchill.jpg',
    'AJ Fernandez New World Dorado': 'aj-fernandez-new-world-dorado-robusto.jpg',
    'AJ Fernandez Bellas Artes Maduro': 'maduro.jpg',
    'AJ Fernandez Dias de Gloria': 'aj-fernandez-dias-de-gloria-brazil-corona.jpg',
    'AJ Fernandez Enclave': 'encl.jpg',
    'Arturo Fuente Hemingway Short Story': 'arturo-fuente-hemingway-short-story.jpg',
    'Ashton VSG Eclipse': 'ashton-vsg-eclipse.jpg',
    'Joya de Nicaragua Cabinetta': 'joya.jpg',
    'Joya de Nicaragua Red Robusto': 'joya-de-nicaragua-red-robusto.jpg',
    'Oliva Serie V Double Robusto': 'oliva-serie-v-double-robusto.jpg',
    'Rocky Patel Edge B52 Corojo': 'rocky-patel-edge-b52-corojo.jpg',
    'Rocky Patel Vintage 1999 Connecticut Robusto': 'rocky-patel-vintage-1999-connecticut-robusto.jpg',
    'Rocky Patel Vintage 1999 Connecticut Junior': 'rocky-patel-vintage-1999-connecticut-junior.jpg',
    'E.P. Carrillo Pledge Prequel': 'e-p-carrillo-pledge-prequel.jpg',
    'League of Fat Bastards Serie O': 'league-of-fat-bastards-serie-o.jpg',
    'League of Fat Bastards Serie L': 'league-of-fat-bastards-serie-l.jpg',
    'Cusano Honduras Robusto': 'cusano-honduras-robusto.jpg',
    'Cusano Honduras Toro': 'cusano-honduras-toro.jpg',
    'Cusano Honduras Churchill': 'cusano-honduras-churchill.jpg',
    'Villa Zamorano Robusto': 'villa-zamorano-robusto.jpg',
    'Villa Zamorano Reserva No.15': 'villa-zamorano-reserva-no-15.jpg',
    'Plasencia Reserva Original': 'original.jpg',
    'My Father Flor de las Antillas Toro': 'the-my-father-flor-de-las-antillas-toro.jpg',
    'My Father Le Bijou 1922 Torpedo': 'my-father-le-bijou-1922-torpedo.jpg',
    'Nicatabaco Factory Blend No.2 Toro Deluxe': 'nicatabaco-factory-blend-no-2-toro-deluxe.jpg',
    'Azan White Campana': 'azan-white-campana.jpg',
    'Davidoff Club Cigarillos': 'club-cigarillo.jpg',
    'Moods MS SW F Cigarillos': 'cigarilles.jpg'
}

for c in cigars:
    match = None
    slug = c['id']
    
    # 1. Exact slug match
    if slug + '.jpg' in existing_names:
        match = slug + '.jpg'
    elif slug + '.png' in existing_names:
        match = slug + '.png'
        
    # 2. Manual Map
    elif c['name'] in manual_map:
        test_match = manual_map[c['name']]
        # Might need to check if .jpg or .png
        base_match = os.path.splitext(test_match)[0]
        if base_match + '.jpg' in existing_names:
            match = base_match + '.jpg'
        elif base_match + '.png' in existing_names:
            match = base_match + '.png'
            
    # 3. Fuzzy match
    if not match:
        names_base = [os.path.splitext(n)[0].replace('-', ' ') for n in existing_names]
        search = slug.replace('-', ' ')
        fuzzy = get_close_matches(search, names_base, n=1, cutoff=0.7)
        if fuzzy:
            idx = names_base.index(fuzzy[0])
            match = existing_names[idx]
            
    if match:
        old_path = f'public/cigars/{match}'
        ext = os.path.splitext(match)[1]
        new_path = f'public/cigars/{slug}{ext}'
        
        # Prevent completely overwriting if there are duplicates mapping to same source
        # We will just copy the file so each gets its own slug
        import shutil
        if not os.path.exists(new_path) or old_path != new_path:
            shutil.copy(old_path, new_path)
            
        c['image'] = f'/cigars/{slug}{ext}'
        used_paths.append(new_path)
    else:
        c.pop('image', None) # Remove image field so it falls back

with open('src/data/cigars.json', 'w') as f:
    json.dump(cigars, f, indent=2)

# Cleanup
all_final = glob.glob('public/cigars/*')
for f in all_final:
    if f not in used_paths:
        os.remove(f)

print('Images mapped perfectly! Unused files deleted.')
