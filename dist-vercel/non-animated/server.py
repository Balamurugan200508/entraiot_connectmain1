import http.server
import sys
import traceback
import os

PORT = 8050

class UnityHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        try:
            # Check if it's a Brotli file
            if self.path.endswith('.br'):
                # Read first 100 bytes of the physical file to see if it contains Brotli compressed signature
                filepath = self.translate_path(self.path)
                is_compressed = False
                if os.path.exists(filepath):
                    try:
                        with open(filepath, 'rb') as f:
                            header = f.read(100)
                            if b'UnityWeb Compressed Content (brotli)' in header:
                                is_compressed = True
                    except Exception as fe:
                        print(f"Error reading file for compression check: {fe}", file=sys.stderr)
                
                if is_compressed:
                    self.send_header('Content-Encoding', 'br')
                    
                if 'framework.js' in self.path:
                    self.send_header('Content-Type', 'application/javascript')
                elif 'wasm' in self.path:
                    self.send_header('Content-Type', 'application/wasm')
                elif 'data' in self.path:
                    self.send_header('Content-Type', 'application/octet-stream')
            elif self.path.endswith('.wasm'):
                self.send_header('Content-Type', 'application/wasm')
            
            super().end_headers()
        except Exception as e:
            print(f"Exception in end_headers: {e}", file=sys.stderr)
            traceback.print_exc()
            raise e

    def log_message(self, format, *args):
        # Print logs to stdout so they flush and appear in command status immediately
        print(f"[{self.log_date_time_string()}] " + (format % args))
        sys.stdout.flush()

# Use multi-threaded server to handle concurrent requests (crucial for WebGL!)
class ThreadingHTTPServer(http.server.ThreadingHTTPServer):
    allow_reuse_address = False

def main():
    print(f"Starting multi-threaded server on http://localhost:{PORT}")
    sys.stdout.flush()
    try:
        server = ThreadingHTTPServer(("", PORT), UnityHTTPRequestHandler)
        server.serve_forever()
    except Exception as e:
        print(f"Server crash: {e}", file=sys.stderr)
        traceback.print_exc()

if __name__ == '__main__':
    main()
