import os
import glob
from PIL import Image

def compress_images():
    gallery_dir = "public/Gallery"
    pattern = os.path.join(gallery_dir, "*.[jJ][pP][gG]")
    files = glob.glob(pattern)
    
    print(f"Found {len(files)} JPEG files to optimize in {gallery_dir}.\n")
    
    total_saved = 0
    
    for filepath in files:
        filename = os.path.basename(filepath)
        orig_size = os.path.getsize(filepath)
        orig_size_mb = orig_size / (1024 * 1024)
        
        print(f"Optimizing {filename} ({orig_size_mb:.2f} MB)...")
        
        try:
            with Image.open(filepath) as img:
                # Keep color profile or metadata if necessary, but convert to RGB if not already
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Resize if dimension is larger than 2000px
                max_dimension = 2000
                width, height = img.size
                if width > max_dimension or height > max_dimension:
                    if width > height:
                        new_width = max_dimension
                        new_height = int(height * (max_dimension / width))
                    else:
                        new_height = max_dimension
                        new_width = int(width * (max_dimension / height))
                    
                    print(f"  Resizing from {width}x{height} to {new_width}x{new_height}")
                    img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                # Save with optimization and quality=85
                img.save(filepath, "JPEG", optimize=True, quality=85)
                
            new_size = os.path.getsize(filepath)
            new_size_mb = new_size / (1024 * 1024)
            saved = orig_size_mb - new_size_mb
            total_saved += saved
            print(f"  -> Compressed to {new_size_mb:.2f} MB (Saved {saved:.2f} MB / {orig_size_mb:.2f} MB)\n")
            
        except Exception as e:
            print(f"  ERROR optimizing {filename}: {e}\n")
            
    print(f"Finished! Total space saved: {total_saved:.2f} MB")

if __name__ == "__main__":
    compress_images()
