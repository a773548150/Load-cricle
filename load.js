
//用canvas实现加载滚动圈
(function(){

	var WIDTH = 400;
	var HEIGHT = 400;
	var round = 0;

	//最上方圆角矩形的，x轴，y轴，宽，长
	var atb = {
		x: 187,
		y:50,
		w:26,
		h:80,
	};

	//圆角矩形
	CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
				
		if (w <= 2 * r) r = w / 2;
		if (h <= 2 * r) r = h / 2;
		this.beginPath();
		this.moveTo(x+r, y);
		this.arcTo(x+w, y, x+w, y+h, r);
		this.arcTo(x+w, y+h, x, y+h, r);
		this.arcTo(x, y+h, x, y, r);
		this.arcTo(x, y, x+w, y, r);
		// this.arcTo(x+r, y);
		this.closePath();
		return this;
	}

	window.onload = function(){

		var canvas = document.getElementById("canvas");
		canvas.width = WIDTH;
		canvas.height = WIDTH;
		var context = canvas.getContext("2d");

		setInterval(
			function(){
				drawRound(context);
			}
			,100);
	}

	//画出12条矩形
	function drawRound(cxt){

		cxt.save();
		cxt.clearRect(0, 0, WIDTH, HEIGHT);

		for(var j = 0 ; j < 12; j++){
			rotateRoundRect(cxt,atb.x, atb.y, atb.w, atb.h, atb.w/2, 30*j);
		}	

		gradient(cxt, round);
		gradient(cxt, round+1);
		gradient(cxt, round+2);

		cxt.restore();
		round++;
		if(round == 12)	round = 0;
	}

	//给矩形加上渐变效果，渐变效果跟随矩形绕画布中心旋转
	function gradient(cxt, num){

		cxt.save();
		rotateRoundRect(cxt,atb.x, atb.y, atb.w, atb.h, atb.w/2, 30*(num % 12));
		cxt.translate(WIDTH/2, HEIGHT/2);
		cxt.rotate( 30*(num % 12) /180*Math.PI);
		
		var linearG = cxt.createLinearGradient(-(WIDTH/2-atb.x), -(HEIGHT/2 - atb.y), -(WIDTH/2-atb.x), -(HEIGHT/2 - atb.y-atb.h));
		if(num == round){
			linearG.addColorStop(0.0, "#DEDEDE");
			linearG.addColorStop(1.0, "#EBEBEB");
		}

		if(num == round + 1){
			linearG.addColorStop(0.0, "#EBEBEB");
			linearG.addColorStop(1.0, "#F3F3F3");
		}

		if(num == round + 2){
			linearG.addColorStop(0.0, "#F3F3F3");
			linearG.addColorStop(1.0, "#FFFFFF");
		}

		cxt.fillStyle = linearG;
		cxt.fill();	
		cxt.restore();		
	}

	//给矩形加上绕画布中心旋转效果
	function rotateRoundRect(cxt,x, y, w, h, r, rot){

		cxt.save();
		cxt.translate(WIDTH/2,HEIGHT/2);
		cxt.rotate(rot/180*Math.PI);
		cxt.fillStyle = "#D3D3D3";			
		cxt.roundRect(-(WIDTH/2-x), -(HEIGHT/2-y), w, h, r);

		cxt.fill();
		cxt.restore();
	}
})();