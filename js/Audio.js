function AudioPlayer(){
	this.audiosamples = {};	
	this.currSample = {};
	this.samplesLoade
}
AudioPlayer.prototype.load = function(songfile, amount){
	this.audiosamples[songfile] = [];
	this.currSample[songfile] = 0;
	for(var i=0;i<amount;i++){
		this.audiosamples[songfile].push(new Audio("resources/" + songfile));
		this.audiosamples[songfile][i].onload = function(){
			this.imagesLoaded[songfile]+= 1;
			if(this.imagesLoaded[songfile] >= this.audiosamples[songfile].length){
				this.loaded = true;
			}
		}.bind(this);
	}
}
AudioPlayer.prototype.play = function(songfile){
	var i = this.currSample[songfile];

	this.audiosamples[songfile][i].currentTime=0; //reset song
	this.audiosamples[songfile][i].play();
	this.currSample[songfile] = (i + 1) % this.audiosamples[songfile].length;
}
