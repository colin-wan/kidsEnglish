#!/usr/bin/env python3
"""
Custom lightweight HTTP Server optimized for iOS Safari (including iOS 12.5.8)
- Automatic local LAN IP detection for iPad connection
- HTTP 206 Partial Content (Byte Range) support for iOS media playback
- Correct MIME types for .m4a (audio/mp4), .svg, and .json
- CORS support for Web Audio API buffer fetching
"""

import os
import sys
import socket
import mimetypes
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 8080

# Configure accurate MIME types
mimetypes.add_type('audio/mpeg', '.mp3')
mimetypes.add_type('audio/mp4', '.m4a')
mimetypes.add_type('image/svg+xml', '.svg')
mimetypes.add_type('application/manifest+json', '.json')

def get_lan_ip():
    """Detect LAN IP address to display for iPad connection."""
    # Method 1: Try socket connection
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        if ip and ip != '127.0.0.1':
            return ip
    except Exception:
        pass

    # Method 2: Try checking system network interfaces
    try:
        import subprocess
        output = subprocess.check_output(['ifconfig'], universal_newlines=True)
        import re
        ips = re.findall(r'inet (192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[0-1])\.\d+\.\d+)', output)
        if ips:
            return ips[0]
    except Exception:
        pass

    return '127.0.0.1'

class ToddlerAppHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and caching headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def send_head(self):
        """Handle HTTP 206 Partial Content for iOS Safari media player."""
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            parts = sys.version_info
            if not self.path.endswith('/'):
                self.send_response(301)
                self.send_header("Location", self.path + "/")
                self.end_headers()
                return None
            for index in "index.html", "index.htm":
                index = os.path.join(path, index)
                if os.path.exists(index):
                    path = index
                    break

        if not os.path.exists(path):
            self.send_error(404, "File not found")
            return None

        ctype = self.guess_type(path)
        try:
            f = open(path, 'rb')
        except OSError:
            self.send_error(404, "File not found")
            return None

        fs = os.fstat(f.fileno())
        size = fs.st_size
        range_header = self.headers.get('Range')

        if range_header and range_header.startswith('bytes='):
            try:
                ranges = range_header.split('=')[1].split('-')
                start = int(ranges[0]) if ranges[0] else 0
                end = int(ranges[1]) if len(ranges) > 1 and ranges[1] else size - 1
                if start >= size:
                    self.send_error(416, "Requested Range Not Satisfiable")
                    f.close()
                    return None
                end = min(end, size - 1)
                length = end - start + 1

                self.send_response(206)
                self.send_header("Content-Type", ctype)
                self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
                self.send_header("Content-Length", str(length))
                self.send_header("Accept-Ranges", "bytes")
                self.end_headers()

                f.seek(start)
                return f
            except Exception:
                pass

        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(size))
        self.send_header("Accept-Ranges", "bytes")
        self.end_headers()
        return f

def run_server():
    server_address = ('', PORT)
    httpd = HTTPServer(server_address, ToddlerAppHandler)
    lan_ip = get_lan_ip()
    
    print("=" * 60)
    print("🦁 Toddler Safari Server Started Successfully!")
    print(f"👉 Local Access:   http://localhost:{PORT}")
    print(f"👉 iPad Wi-Fi URL:  http://{lan_ip}:{PORT}")
    print("=" * 60)
    print("Tips for iPad (iOS 12.5.8):")
    print("1. Ensure iPad is connected to the same Wi-Fi network.")
    print(f"2. Open Safari on iPad and go to http://{lan_ip}:{PORT}")
    print("3. Tap the Share button in Safari -> 'Add to Home Screen'")
    print("4. Enjoy the full-screen interactive English safari app!")
    print("=" * 60)
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        httpd.server_close()

if __name__ == '__main__':
    run_server()
