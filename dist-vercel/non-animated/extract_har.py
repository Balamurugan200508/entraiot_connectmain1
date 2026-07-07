import json
import os

har_path = 'world.har'
out_path = 'har_contents_output.json'

with open(har_path, 'r', encoding='utf-8') as f:
    har_data = json.load(f)

entries = har_data.get('log', {}).get('entries', [])

output_data = []

for i, entry in enumerate(entries):
    req = entry.get('request', {})
    url = req.get('url', 'Unknown URL')
    method = req.get('method', 'GET')
    
    post_data = req.get('postData', {}).get('text', '')
    
    # Try to parse the postData if it is JSON or line-delimited JSON
    parsed_post_data = []
    if post_data:
        for line in post_data.strip().split('\n'):
            try:
                parsed_post_data.append(json.loads(line))
            except:
                parsed_post_data.append(line)
                
    output_data.append({
        "Request Number": i + 1,
        "Method": method,
        "URL": url,
        "Payload Sent": parsed_post_data
    })

with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(output_data, f, indent=4)

print(f"Successfully extracted the contents into {out_path}")
