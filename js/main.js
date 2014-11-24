var currentScore=0;
var currentLevel=1;
var level=document.getElementById('Level');
var parent=document.getElementById('mainroad');
var scoreBoard=document.getElementById('Scorecard');
var levelCheck=0;
var counter = 0;
var opponentlist = [];
var universalGap=5000;
var gap=5000;
var test=500;
var move=0;
var e = setInterval(game,gap);
var pos=1;
var consts = {}; // Object to store all constants
consts.left= 37;                   
consts.top= 38;
consts.right= 39;
consts.bottom= 40;
consts.vanishPoint=575;
consts.lane1=0;
consts.lane2=1;
consts.lane3=2;
consts.lane1Position=0;
consts.lane2Position=110;
consts.lane3Position=220;
Object.freeze(consts);

function game() {
	if(counter==0)
	{
		counter++;
		var player=new Player();
		player.create();
	}
	var g = new Gameloop();
   	var we=g.makeopponent();
    opponentlist.push(we);
	clearInterval(e);
	e = setInterval(game,gap);
}


function Gameloop() {
    this.x = 0;
    this.y = 0;
    this.interverId;
    this.element;
    this.scoreelement;
	this.levelelement;
	this.position;
	var that = this;
	this.makeopponent = function() {

        that.element = document.createElement('div');
        var oppo=getRandomArbitrary(0, 3);
		if(oppo==1)
		{
			that.element.className = 'opponent2';
		}
		else if(oppo==2)
		{
			that.element.className = 'opponent3';
		}
		else
		{
			that.element.className = 'opponent4';
		}
        parent.appendChild(that.element);
        that.x = getRandomArbitrary(0, 3);
        if (that.x == 0)
        {	
			that.x = consts.lane1Position;
			that.position=consts.lane1;
		}
        else if (that.x == 1) {
            that.x = consts.lane2Position;
			that.position=consts.lane2;
        } 
		else if (that.x == 2) {
            that.x = consts.lane3Position;
			that.position=consts.lane3;
        }
		that.y = 0;
		that.element.style.top = that.y + "px";
        that.element.style.left = that.x + "px";
        that.element.style.backgroundColor = "yellogreen";
		that.intervalId = setInterval(that.moveopponent,20);
    };
    this.moveopponent = function () {
        that.y+=currentLevel*2;
		if((that.y>=(test-108||that.y<=(test))) && that.position==pos ){
			parent.style.backgroundImage="url(images/gameover.png)";
			parent.style.backgroundPosition="0px 0px";
			parent.style.backgroundRepeat="none";
			clearInterval(that.intervalId);
			while (parent.firstChild) {
    			parent.removeChild(parent.firstChild);
				move=0;
			}
			exitGame();
		}
        that.element.style.top = that.y + "px";
		move=move+1;
		parent.style.backgroundPosition="0px"+" "+move+"px";
        if (that.y > consts.vanishPoint) {
            clearInterval(that.intervalId);
          	parent.removeChild(that.element);
			that.scoreelement=that.score();
		}
	}
	
	this.score=function(){
		that.element = document.createElement('span');
		while(scoreBoard.firstChild){
			scoreBoard.removeChild(scoreBoard.firstChild);}
        	currentScore+=currentLevel*10;
			scoreBoard.appendChild(that.element);
			that.element.innerHTML="Score:"+currentScore;
			that.element.style.top=10+"px";
			that.element.style.left=10+"px";
			if(currentScore>=100*Math.pow(currentLevel,2))
				boostLevel();
		}
	
	function boostLevel()
	{
		element=document.createElement('span');
		while(level.firstChild)
		{
			level.removeChild(level.firstChild);
		}
		currentLevel++;
		gap=universalGap/currentLevel;
		level.appendChild(element);
		element.innerHTML="Level:"+currentLevel;
		element.style.top=10+"px";
		element.style.left=10+"px";
	}
		
	function getRandomArbitrary(min, max) {
		return parseInt(Math.random() * (max - min) + min).toFixed(0);
	}
	
	}
	
	
	function Player() {
		this.x = 0;
		this.y = 0;
		this.element;
		var that = this;
		
		this.create = function() {
	
			that.element = document.createElement('div');
			that.element.className ='player';
			parent.appendChild(that.element);
			that.x=110;
			that.y=500;
			that.element.style.top = that.y + "px";
			that.element.style.left = that.x + "px";
			that.element.style.backgroundColor = "yellogreen";
			document.body.onkeydown=function(e)
			{
				 var e = e || window.event;
				 if (e.keyCode == consts.left) {
					if(that.x==consts.lane3Position){
						that.x=consts.lane2Position;
						pos=consts.lane2;
					}
					else{
						that.x=consts.lane1Position;
						pos=consts.lane1;
					}
				}
				else if (e.keyCode == consts.right) {
					if(that.x==consts.lane2Position){
						that.x=consts.lane3Position;
						pos=consts.lane3;
					}
					else{
						that.x=consts.lane2Position;
						pos=consts.lane2;
					}
				}
				else if(e.keyCode == consts.top)
				{
					if(that.y>=0)
					that.y=that.y-4;
				}
				else if(e.keyCode == consts.bottom)
				{
					if(that.y<=500)
						that.y=that.y+4;
				}
				that.element.style.top = that.y + "px";
				that.element.style.left = that.x + "px";
				test=that.y;
			}
		};
	}
	
	function exitGame(){
		clearInterval(e);
		var sc=document.createElement("div");
		var newGame=document.createElement("div");
		newGame.className="ng";
		newGame.innerHTML="NEW GAME";
		sc.className="score";
		sc.innerHTML=currentScore;
		parent.appendChild(newGame);
		parent.appendChild(sc);
		newGame.onclick=function(){
		window.location="file:///C:/Users/Roshan/Desktop/Car%20Race/index.htm";
		var t=window.location;
		return  t;
	}
}