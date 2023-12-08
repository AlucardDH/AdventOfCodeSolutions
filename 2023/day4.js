var data = document.body.textContent.split('\n')
data.pop()

var CARDS = []
class Card {
	id=0
	winning=[]
	numbers=[]
	points=0
	count=1
	gainCards=0

	constructor(line) {
		var d = line.match(/^Card *(\d+):(.*)\|(.*)$/)
		this.id = +d[1]
		this.winning = d[2].match(/\d+/g).map(v=>+v)
		this.numbers = d[3].match(/\d+/g).map(v=>+v)
		this.gainCards = this.numbers.filter(v=>this.winning.includes(v)).length
		this.points = this.gainCards ? 2**(this.gainCards-1) : 0
	}
}

var r = 0


data.forEach(line =>{
	var c = new Card(line)
	CARDS.push(c)
	r += c.points
});

console.log(r)

for(var i=0;i<data.length;i++) {
	var card = CARDS[i]
	for(var j=i+1;j<=i+card.gainCards;j++) {
		CARDS[j].count += card.count;
	}
}

var r2 = CARDS.reduce((s,c)=>s+c.count,0);
console.log(r2)