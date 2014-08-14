var http = require("http")
var mustache = require("mustache")

var view = {
	title: "Jojij",
	calc: function () {
		return 5 * 4
	}
}

var template = "<body><h3>{{title}}</h3><p> <strong>spend</strong> {{calc}}</p></body>"

var output = mustache.render(template, view)

var router = function (request, response) {
	response.writeHead(200, {"Content-type": "text/html"})
	response.write(output)
	response.end()
}

console.log(output)

var server = http.createServer(router)
server.listen(3099)
console.log("server listen at 3099 port")
