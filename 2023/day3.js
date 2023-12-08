var data = document.body.textContent.split('\n')
data.pop()

var width = data[0].length
var height = data.length

var r = 0

var STARS = []

class Star {
	x;
	y;
	nums=[];

	constructor(x,y) {
		this.x = x
		this.y = y
	}

	isGear() {
		return this.nums.length==2
	}

	value() {
		return this.nums.reduce((p,v)=>p*v,1)
	}
}

class Num {
	y;
	xS;
	xE;
	value;
	isPart = false;

	constructor(line,x,y) {
		this.y = y
		this.xS = x
		for(this.xE=x;this.xE+1<line.length && line[this.xE+1].match(/\d/);this.xE++);
		this.value = +line.substring(this.xS,this.xE+1);

		for(var sy=Math.max(0,y-1);sy<=Math.min(height-1,y+1);sy++) {
			for(var sx=Math.max(0,this.xS-1);sx<=Math.min(width-1,this.xE+1);sx++) {
				if(data[sy][sx]!='.' && data[sy][sx].match(/\D/)) {
					this.isPart = true
				}
				if(data[sy][sx]=='*') {
					var S = STARS.find(s=>s.x==sx && s.y==sy);
					if(!S) {
						S = new Star(sx,sy)
						STARS.push(S)
					}
					S.nums.push(this.value)
				}
			}	
		}
	}
}

var PARTS = []
var r1 = 0

for(var y=0;y<height;y++) {
	var line = data[y]
	for(var x=0;x<width;x++) {
		if(line[x].match(/\d/)) {
			var num = new Num(line,x,y)
			console.error(num)
			x = num.xE
			if(num.isPart) {
				PARTS.push(num)
				r1 += num.value
			}
		}
	}
}

console.log(r1)

var r2 = 0
STARS.forEach(s=>{
	if(s.isGear()) {
		r2 += s.value()
	}
})

console.log(r2)