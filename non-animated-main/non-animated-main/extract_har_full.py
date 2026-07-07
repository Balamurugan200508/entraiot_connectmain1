import json
import os
import base64
from urllib.parse import urlparse

har_path = 'jenamdvacetpet.cz.har'
base_url = 'https://jenamdvacetpet.cz'

print(f"Reading HAR file {har_path}...")
with open(har_path, 'r', encoding='utf-8') as f:
    har_data = json.load(f)

entries = har_data.get('log', {}).get('entries', [])
print(f"Found {len(entries)} entries in HAR.")

extracted_count = 0

for entry in entries:
    req = entry.get('request', {})
    url = req.get('url', '')
    
    if not url.startswith(base_url):
        continue
        
    res = entry.get('response', {})
    content = res.get('content', {})
    
    size = content.get('size', 0)
    mime_type = content.get('mimeType', '')
    text = content.get('text', '')
    encoding = content.get('encoding', '')
    
    if not text and size > 0:
        # Sometimes there's no text but there is size, might be empty or missing in HAR
        continue
        
    # Parse URL to get local path
    parsed_url = urlparse(url)
    path = parsed_url.path
    
    # If path is empty or ends with /, it's index.html
    if not path or path.endswith('/'):
        path += 'index.html'
        
    # Remove leading slash for local saving
    local_path = path.lstrip('/')
    
    # Create directories if they don't exist
    local_dir = os.path.dirname(local_path)
    if local_dir:
        os.makedirs(local_dir, exist_ok=True)
        
    # Decode content
    try:
        if encoding == 'base64':
            file_data = base64.b64decode(text)
            mode = 'wb'
        else:
            file_data = text.encode('utf-8')
            mode = 'wb'
            
        with open(local_path, mode) as out_f:
            out_f.write(file_data)
            
        print(f"Extracted: {local_path} ({len(file_data)} bytes, {mime_type})")
        extracted_count += 1
    except Exception as e:
        print(f"Failed to extract {url}: {e}")

print(f"\nExtraction complete! Extracted {extracted_count} files.")
