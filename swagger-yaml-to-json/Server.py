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
        self.send_header('Content-type','application/json')
        self.end_headers()
 
        # Send message back to client
        # message = "Hello world!"
        message = self.rfile.read(int(self.headers['Content-Length'])).decode('utf-8')

	# Write it to a file
        file = open('swagger.yaml', 'w')
        file.truncate()
        file.write(message)
        file.close()

        # Call codegen to generate JSON
        subprocess.call(["java", "-jar", "swagger-codegen-cli.jar", "generate", "-i", "swagger.yaml", "-l", "swagger", "-o", "."])
		
        # Read it from a file
        inFile = open('swagger.json', 'r')
        json = inFile.read()

        # Write content as utf-8 data
        self.wfile.write(bytes(json, "utf8"))
        return
 
def run():
  print('starting server...')
 
  # Server settings
  # Choose port 8080, for port 80, which is normally used for a http server, you need root access
  server_address = ('', 8080)
  httpd = HTTPServer(server_address, testHTTPServer_RequestHandler)
  print('running server...')
  httpd.serve_forever()
 
 
run()
