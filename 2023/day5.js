var data = document.body.textContent.split('\n')
data.pop()

var SEEDS = []


class Range {

	start=0
	end=0

	offset=0

	targetStart=0
	size=0

	constructor(sourceStart,targetStart,size) {
		this.start = sourceStart
		this.size = size
		this.end = sourceStart+size-1
		this.offset = targetStart-sourceStart
	}

	contains(value) {
		return value>=this.start && value<=this.end
	}

	get(source) {
		if(!this.contains(source)) {
			return source
		}
		return source+this.offset
	}

	intersect(range) {
		if(this.end<range.start || this.start>range.end) {
			return null
		}
		if(this.start==range.start && this.end==range.end) {
			return this
		}
		var start = Math.max(this.start,range.start)
		var end = Math.min(this.end,range.end)

		return new Range(start,start+offset,end-start+1)
	}
}

class Ranges {

	ranges = []

	add(range) {
		this.ranges.push(range)
	}

	get(source) {
		var matchingRange = this.ranges.find(r=>r.contains(source))
		return matchingRange ? matchingRange.get(source) : source
	}

}

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