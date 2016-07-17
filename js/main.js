window.requestAnimationFrame = 
    window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    window.oRequestAnimationFrame || 
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

function Game(){ //controls the game
	this.canvas = document.getElementById("canvas");
	//size canvas
	var size = Math.min(window.innerWidth, window.innerHeight);
	this.canvas.width = size;
	this.canvas.height = size;

	this.ctx = this.canvas.getContext("2d");

	this.timer = 0;
	this.total_timer = 0;
	this.prevTimestep = 0;
	this.gameSpeed = 1.0;

	this.gameWidth=1000; //screen may be resized, but this is the internal resolution
	this.gameHeight=1000;

	//handle resizes
	window.addEventListener( 'resize', function(){
		var size = Math.min(window.innerWidth, window.innerHeight);

		this.canvas.width = size;
		this.canvas.height = size;
	}.bind(this), false );

	this.resourceFolder = "resources/"

	this.cirno = new LevelCirno(this);
	this.reimu = new LevelReimu(this);
	this.background = new Background(this);
	this.audio = new AudioPlayer();
	this.audio.load("speechblip.wav",6);
	this.audio.load("cirnability.wav",1);

	this.textbox = new Textbox("cirno");
	this.director = new Director();

	this.shinyrays = [];
	this.snowflakes = [];

	this.stopped = false;
}
Game.prototype.playCutscene = function(cutscene){
if(typeof(cutscene)!=undefined)
	this.currentCutscene = cutscene;
}
Game.prototype.start = function(){
	//when all loaded, start for real
	this.ctx.fillStyle = "#000";
	this.ctx.fillRect(0,0,this.gameWidth,this.gameHeight);
	this.ctx.font = "30px sans";
	this.ctx.fillStyle = "#fff";
	this.ctx.fillText("Loading...",200,200);

	var shinyLoaded = true;
	for(var i=0;i<this.shinyrays.length;i++){
		shinyLoaded = shinyLoaded && this.shinyrays[i].loaded;
	}

	//loop until everything is loaded
	if(this.cirno.loaded && this.reimu.loaded && this.background.loaded && this.textbox.loaded && shinyLoaded){
		this.director.start(this);
		this.tick(performance.now());

		//increment start count
		if(window.localStorage["cirnostarted"] === undefined){
			window.localStorage["cirnostarted"] = "1";
		}else{
			window.localStorage["cirnostarted"] = parseInt(window.localStorage["cirnostarted"])+1;
		}

	}else{
		window.requestAnimationFrame(this.start.bind(this));
	}
}
Game.prototype.drawSprite = function(img,x,y){
	//todo: flipping images
	if(this.x-img.width>this.width || this.x+img.width<0|| this.y-img.height > this.height){
		//If nobody will know...
		return;
	}

	//if(flip)imageToDraw.src=flipImage(imageToDraw);
	this.ctx.drawImage(img,x,y);
}
Game.prototype.drawCircle = function(x,y,radius,style){
	this.ctx.beginPath();
	this.ctx.fillStyle = style;
    	this.ctx.arc(x,y,radius, 0, 2 * Math.PI, false);
   	this.ctx.fill();
}
Game.prototype.timeIncrement = 1000/60;
Game.prototype.tick = function(timestep){
	//one frame should be every 1000/60 seconds, so if
	//timestep is bigger then 16, then do 2 ticks.
	//console.log(parseInt((timestep-this.prevTimestep)/16)+1);
	var delta = timestep - this.prevTimestep;

	this.timer += delta / this.gameSpeed;
	while(this.timer >= this.timeIncrement){
		if(this.stopped)break;

		this.timer -= this.timeIncrement;
		//drawBackgroundEllipses();

		//update
		this.cirno.tick(this.timeIncrement);
		this.reimu.tick(this.timeIncrement);
		this.textbox.tick(this.timeIncrement);
		this.director.tick(this.timeIncrement);

		if(this.stopped)break; //if the director just paused the game, don't update any more

		for(var i=0;i<this.shinyrays.length;i++){
			this.shinyrays[i].tick(this.timeIncrement);
		}
		for(var i=0;i<this.snowflakes.length;i++){
			this.snowflakes[i].tick(this.timeIncrement);
		}
	}
	//draw
	this.canvas.width = this.canvas.width; //clear canvas
	this.canvas.getContext("2d").scale(this.canvas.width / this.gameWidth,this.canvas.height / this.gameHeight);
	//this.ctx.save();
	

	this.background.draw(this);

	//draw things
	
	//debug circle
	//this.drawCircle(window.q++,50,20,"#f00");

	this.cirno.draw(this);
	this.reimu.draw(this);
	this.textbox.draw(this);
	for(var i=0;i<this.shinyrays.length;i++){
		this.shinyrays[i].draw(this);
	}

	for(var i=0;i<this.snowflakes.length;i++){
		this.snowflakes[i].draw(this);
	}
		
	//this.ctx.restore();

	this.prevTimestep = timestep;
	window.requestAnimationFrame(this.tick.bind(this));
}
Game.prototype.setSpeed = function(x){
	if(typeof(x) != 'number')return;
	this.gameSpeed = x;
}

var game,key;
window.onload = function(){
	key = new Keyboardlistener();
	key.start(true,false);
	game = new Game();
	game.start();

}
window.q = 0;
