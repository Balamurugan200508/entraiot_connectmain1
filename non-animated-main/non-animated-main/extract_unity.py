import os
import UnityPy
from PIL import Image

def main():
    print("Loading UnityWebData container...")
    env = UnityPy.load("desktop.data.br")

    out_dir = "extracted_unity_assets"
    os.makedirs(out_dir, exist_ok=True)

    print(f"Total objects found: {len(env.objects)}")
    
    counts = {"Texture2D": 0, "Mesh": 0, "TextAsset": 0, "AudioClip": 0}

    for obj in env.objects:
        if obj.type.name in ["Texture2D", "Mesh", "TextAsset", "AudioClip"]:
            try:
                data = obj.read()
                # Get a valid name for the file
                name = getattr(data, "name", f"unnamed_{obj.path_id}")
                if not name:
                    name = f"unnamed_{obj.path_id}"
                
                # Sanitize name
                name = "".join(c for c in name if c.isalnum() or c in (' ', '.', '_', '-')).rstrip()
                
                # Create subfolder based on type
                type_dir = os.path.join(out_dir, obj.type.name)
                os.makedirs(type_dir, exist_ok=True)
                
                if obj.type.name == "Texture2D":
                    fp = os.path.join(type_dir, f"{name}.png")
                    data.image.save(fp)
                    counts["Texture2D"] += 1
                
                elif obj.type.name == "TextAsset":
                    fp = os.path.join(type_dir, f"{name}.txt")
                    with open(fp, "wb") as f:
                        f.write(data.script)
                    counts["TextAsset"] += 1
                    
                elif obj.type.name == "AudioClip":
                    # For AudioClip, we can just save the raw data for now or use the export method if available
                    # Actually UnityPy has an export method, but it depends on external libraries (like FMOD)
                    # Let's see if we can get samples
                    for ext, audio_data in data.samples.items():
                        fp = os.path.join(type_dir, f"{name}.{ext}")
                        with open(fp, "wb") as f:
                            f.write(audio_data)
                        break
                    counts["AudioClip"] += 1
                
                elif obj.type.name == "Mesh":
                    # UnityPy can export meshes to .obj!
                    # Actually Mesh doesn't have a direct .obj export property, but some forks do.
                    # Let's use mesh.export() if it exists.
                    fp = os.path.join(type_dir, f"{name}.obj")
                    if hasattr(data, "export"):
                        with open(fp, "wt", encoding="utf-8") as f:
                            f.write(data.export())
                        counts["Mesh"] += 1
            except Exception as e:
                # print(f"Failed to extract {obj.type.name} {getattr(obj, 'name', obj.path_id)}: {e}")
                pass
                
    print("Extraction complete.")
    for k, v in counts.items():
        print(f"Extracted {v} {k} files.")

if __name__ == "__main__":
    main()

