var a_canvas=document.getElementById("a");
						var a_context=a_canvas.getContext("2d");
						
						var gradient=a_context.createLinearGradient(40,0,200,0);
						gradient.addColorStop(0,'#6e6e6e');
						gradient.addColorStop(0.5,'#bababa');
						gradient.addColorStop(1,'#6e6e6e');
a_context.fillStyle=gradient;
a_context.fillRect(20, 40, 200, 30);
