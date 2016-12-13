#!/usr/bin/env python
 
from http.server import BaseHTTPRequestHandler, HTTPServer
import subprocess
 
# HTTPRequestHandler class
class testHTTPServer_RequestHandler(BaseHTTPRequestHandler):
 
  # GET
  def do_POST(self):
        # Send response status code
        self.send_response(200)
 
        # Send headers
        self.send_header('Content-type','text/html')
        self.end_headers()
 
        # Send message back to client
        # message = "Hello world!"
        message = self.rfile.read(int(self.headers['Content-Length'])).decode('utf-8')

	# Write it to a file
        file = open('swagger.json', 'w')
        file.truncate()
        file.write(message)
        file.close()

        # Call codegen to generate HTML 
        subprocess.call(["java", "-jar", "swagger-codegen-cli.jar", "generate", "-i", "swagger.json", "-l", "html", "-o", "."])
		
        # Read it from a file
        inFile = open('index.html', 'r')
        json = inFile.read()

        # Write content as utf-8 data
        self.wfile.write(bytes(json, "utf8"))
        return
 
def run():
  print('starting server...')
 
  # Server settings
  # Choose port 8081, for port 80, which is normally used for a http server, you need root access
  server_address = ('', 8081)
  httpd = HTTPServer(server_address, testHTTPServer_RequestHandler)
  print('running server...')
  httpd.serve_forever()
 
 
run()
