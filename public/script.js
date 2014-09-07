						var diagram=document.getElementById("diagr");
						var canvas=document.createElement("canvas");
						canvas.setAttribute('width', diagram.clientWidth-20);
						canvas.setAttribute('height', diagram.clientHeight-40);
						canvas.setAttribute('id', 'canvaz');
						diagram.appendChild(canvas);
						var a_context=canvas.getContext("2d");
						var speed=0.0, x=diagram.clientWidth/2-10, y=40.0;
						var curState = 'poweroff';
						var state = new handlers();
						function drawTopObject(ctx, x, y) {
						var gradient=a_context.createLinearGradient(x-100,0,x+100,0);
						gradient.addColorStop(0,'#6e6e6e');
						gradient.addColorStop(0.5,'#bababa');
						gradient.addColorStop(1,'#6e6e6e');																	
						function drawRect(width, height, fillStyle) {
								ctx.fillStyle=fillStyle;
								ctx.fillRect(x-width/2, y, width, height);
								ctx.strokeStyle='black';
								ctx.strokeRect(x-width/2, y, width, height);
							} 	 
						drawRect(200, 30, gradient);
						y+=30;
						drawRect(100, 15, gradient);
						y+=15;
						drawRect(50, 60, 'black');
						}

						function handlers() {
							this.powerHL = document.getElementById('POWERID');
							this.contactHL = document.getElementById('CONTACTID');
							this.ecmHL = document.getElementById('ECMID');
							this.washHL = document.getElementById('WASHID');
							this.findrefHL = document.getElementById('FINDREFID');

							this.sb1ID = document.getElementById('SB1ID');	
							this.sb6ID = document.getElementById('SB6ID');
							this.sbsID = document.getElementById('SBSID');
							this.hl2ID = document.getElementById('HL2ID');
							this.hl3ID = document.getElementById('HL3ID');

						}

						function init_machine(handler) {
							state_power_off(state);
							handler.sb6ID.addEventListener('click', function (event) {state.hl2ID.setAttribute("class", "HLianim");
																						setTimeout(function (){curState = 'poweron';state.hl2ID.setAttribute("class", "HLi");state_power_on(state);},5000);});
							handler.sb1ID.addEventListener('click', function (event) {state.hl3ID.style.animationName = 'poweron'; 
																						setTimeout(function (){curState = 'findref';},100);});
							handler.sbsID.addEventListener('click', function (event) {//state.hl3ID.style.animationName = 'poweron'; 
																						setTimeout(function (){curState = 'poweroff'; speed = 0; y = 40.0;state_power_off(state);},0);});
							
							
						}

						function state_power_off(handler) {
							handler.powerHL.style.backgroundColor = 'red';
							handler.contactHL.style.backgroundColor = 'white';
							handler.ecmHL.style.backgroundColor = 'white';
							handler.washHL.style.backgroundColor = 'white';
							handler.findrefHL.style.backgroundColor = 'white';
							handler.hl2ID.style.backgroundColor = 'white';
							handler.hl3ID.style.backgroundColor = 'white';
						}

						function state_power_on(handler) {
							handler.powerHL.style.backgroundColor = 'white';
							handler.contactHL.style.backgroundColor = 'white';
							handler.ecmHL.style.backgroundColor = 'white';
							handler.washHL.style.backgroundColor = 'white';
							handler.findrefHL.style.backgroundColor = 'red';
							handler.hl2ID.style.backgroundColor = 'red';
							handler.hl3ID.style.backgroundColor = 'white';	
						}

						function state_ready(handler) {
							handler.powerHL.style.backgroundColor = 'white';
							handler.contactHL.style.backgroundColor = 'red';
							handler.ecmHL.style.backgroundColor = 'white';
							handler.washHL.style.backgroundColor = 'white';
							handler.findrefHL.style.backgroundColor = 'white';
							handler.hl2ID.style.backgroundColor = 'red';
							handler.hl3ID.style.backgroundColor = 'red';	
						}						

						function drawBottomObject(ctx, x, y) {
						var gradient=a_context.createLinearGradient(x-250/2,0,x-250/2+250,0);
						gradient.addColorStop(0,'#6e6e6e');
						gradient.addColorStop(0.5,'#bababa');
						gradient.addColorStop(1,'#6e6e6e');																	
						function drawRect(width, height, fillStyle) {
								ctx.fillStyle=fillStyle;
								ctx.fillRect(x-width/2, y-height, width, height);
								ctx.strokeStyle='black';
								ctx.strokeRect(x-width/2, y-height, width, height);
							} 	 
						drawRect(250, 15, gradient);
						y-=15;
						drawRect(100, 60, gradient);
						}
						function draw(ctx) {
							ctx.fillStyle="white";
							ctx.fillRect(0, 0, canvas.width, canvas.height);
							//ctx.fillStyle=gradient;
							//ctx.fillRect(20, y, 200, 30);

							drawBottomObject(ctx, x, 400);
							drawTopObject(ctx, x, y);
						}
						function drawLoop() {
							a_context.clearRect(0, 0, canvas.width, canvas.height);
							if (curState=='poweroff'|| curState=='poweron') {y = 40.0;} else
							if (curState=='findref') {
								if (y<=400-15-105-60) {y=40.0 + speed;
										speed+=0.1;
									} 
								if (y>=400-15-105-60) {curState='ref';}
							}
							if (curState=='ref') state_ready(state);
							draw(a_context);
						}

						
						init_machine(state);

						var timer = setInterval(drawLoop, 1000/60);
