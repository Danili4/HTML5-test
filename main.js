var http = require("http")
var fs = require("fs")
var path = require("path")
var mime = require("mime")
var cache = {}

function send404(response) {
	response.writeHead(404, {"Content-type": "text/plain"})
	response.write("Error 404: resource not found.")
	response.end()
}

function sendFile(response, filePath, fileContents) {
	response.writeHead(200, {"Content-type": mime.lookup(path.basename(filePath))})
	response.end(fileContents)
	console.log(filePath)
}

function serveStatic(response, cache, absPath) {
	if(cache[absPath]) {
		sendFile(response, absPath, cache[absPath])
	} else {
		fs.exists(absPath, function(exists) {
			if(exists) {
				fs.readFile(absPath, function(err, data) {
					if(err) {
						send404(response)
					} else {
						cache[absPath]=data
						sendFile(response, absPath, data)
					}
				})
			} else {
				send404(response)
			}	
		})
	}
}

function route(request, response) {
var filePath = false
if(request.url =='/') {
	filePath = 'public/index.html'
} else {
	filePath = 'public' + request.url
}

var absPath = './' + filePath
serveStatic(response, cache, absPath)
}
var server = http.createServer(route)
server.listen(3099)
console.log("server listen at 3099 port")
