import os
import shutil
import json

# ── 1. Rename Gallery files that have spaces ──────────────────────────────────
gallery_renames = {
    "public/Gallery/More Than A lounge circle.jpg": "public/Gallery/more-than-a-lounge-circle.jpg",
    "public/Gallery/perfect pairing.jpg":           "public/Gallery/perfect-pairing.jpg",
}

for src, dst in gallery_renames.items():
    if os.path.exists(src):
        os.rename(src, dst)
        print(f"Renamed: {src} → {dst}")
    else:
        print(f"SKIP (not found): {src}")

# ── 2. Create clean accessories folder ───────────────────────────────────────
os.makedirs("public/accessories", exist_ok=True)

# ── 3. Load accessories.json to get the slug → original filename mapping ──────
with open("src/data/accessories.json", "r", encoding="utf-8") as f:
    accessories = json.load(f)

# Build mapping: original image basename → new path
src_dir = "public/Gifts and Accessories"

for item in accessories:
    # Extract original filename from the current image path
    orig_path_rel = item["image"]  # e.g. "/Gifts and Accessories/20–25 Cigar Humidor Cherry.png"
    orig_filename  = orig_path_rel.split("/")[-1]           # "20–25 Cigar Humidor Cherry.png"
    ext            = os.path.splitext(orig_filename)[1]     # ".png"
    new_filename   = item["id"] + ext                       # "20-25-cigar-humidor-cherry.png"

    src_path = os.path.join(src_dir, orig_filename)
    dst_path = os.path.join("public/accessories", new_filename)

    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"Copied: {orig_filename} → accessories/{new_filename}")
    else:
        print(f"SKIP (not found): {src_path}")

    # Update the image path in the JSON object
    item["image"] = f"/accessories/{new_filename}"

# ── 4. Save updated accessories.json ─────────────────────────────────────────
with open("src/data/accessories.json", "w", encoding="utf-8") as f:
    json.dump(accessories, f, indent=2, ensure_ascii=False)

print("\nDone! accessories.json updated with clean paths.")
print("Remember to also update page.tsx Gallery image src paths.")
