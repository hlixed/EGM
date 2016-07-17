function Keyboardlistener(){
this.up = this.down=this.left=this.right=this.z=false;
this.w=this.a=this.s=this.d=this.space=this.enter=false;
this.q=this.e=false;

this.verbose;

Keyboardlistener.prototype.keyPressed = function(event){
if(event.keyCode == 13){this.enter=true;}

if(event.keyCode == 37){this.left=true;}
if(event.keyCode == 38){this.up=true;}
if(event.keyCode == 39){this.right=true;}
if(event.keyCode == 40){this.down=true;}
if(event.keyCode == 90){this.z=true;}

if(event.keyCode == 65){this.a=true;}
if(event.keyCode == 83){this.s=true;}
if(event.keyCode == 68){this.d=true;}
if(event.keyCode == 87){this.w=true;}
if(event.keyCode == 32){this.space=true;}

if(event.keyCode == 81){this.q=true;}
if(event.keyCode == 69){this.e=true;}

if(this.verbose)console.log("key down:"+ event.keyCode)
}
Keyboardlistener.prototype.keyReleased = function(event){
if(event.keyCode == 13){this.enter=false;}

if(event.keyCode == 37){this.left=false;}
if(event.keyCode == 38){this.up=false;}
if(event.keyCode == 39){this.right=false;}
if(event.keyCode == 40){this.down=false;}
if(event.keyCode == 90){this.z=false;}

if(event.keyCode == 65){this.a=false;}
if(event.keyCode == 83){this.s=false;}
if(event.keyCode == 68){this.d=false;}
if(event.keyCode == 87){this.w=false;}
if(event.keyCode == 32){this.space=false;}

if(event.keyCode == 81){this.q=false;}
if(event.keyCode == 69){this.e=false;}

if(this.verbose)console.log("key up:"+event.keyCode);
}
Keyboardlistener.prototype.start = function(bind, verbose){//optional.
if(bind){
  document.onkeydown = key.keyPressed.bind(key);
  document.onkeyup = key.keyReleased.bind(key);
}
this.verbose=verbose;
}
}