var data = document.body.textContent.split('\n')
data.pop()

class GameSet {
	r = 0;
	g = 0;
	b = 0;

	constructor(s) {
		s.trim().split(',')
			.map(v=>v.trim().split(' '))
			.map(v=>{return {color:v[1],count:v[0]}})
			.forEach(v=>{
				this[v.color[0]] = v.count
			})
	}

}
class Game {
	id;
	sets = [];

	constructor(line) {
		var d = line.match(/^Game (\d+): (.*)$/)
		this.id = +d[1]
		d[2].split(';').forEach(s=>this.sets.push(new GameSet(s)))
	}

	isPossible(bag) {
		return !this.sets.find(s=>s.r>bag.r || s.g>bag.g || s.b>bag.b)
	}

	power() {
		var min = {r:0,g:0,b:0}
		this.sets.forEach(s=>{
			min.r = Math.max(min.r,s.r)
			min.g = Math.max(min.g,s.g)
			min.b = Math.max(min.b,s.b)
		})
		return min.r*min.g*min.b
	}
}


var BAG = {r:12,g:13,b:14}

var r = 0;
var r2 = 0;

data.forEach(g=>{
	var g = new Game(g)
	console.error(g)
	if(g.isPossible(BAG)) {
		r += g.id;
	}
	r2 += g.power()
})

console.log(r)

console.log(r2)