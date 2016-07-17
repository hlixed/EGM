function Snowflake(game){

	this.x = -80- Math.random()*800;
	this.y = -80 - Math.random()*800;

	this.dx = Math.random() + 1;
	this.dy = Math.random() + 1;

	this.timer = 0;

	this.size = Math.random() *10 + 5;

}
Snowflake.prototype.draw = function(game){
	game.drawCircle(this.x,this.y, this.size, "#fff");
}

Snowflake.prototype.tick = function(delta){
	this.x += this.dx * delta / 5;
	this.y += this.dy * delta / 5;

	this.dx += delta /1000;
	this.dy += delta /1000;

	if(this.x > game.gameWidth)this.x = -80;
	if(this.y > game.gameHeight)this.y = -80;

}
