class Monkey {
	id;
	items;
	operation;
	divisible;
	throwTrue;
	throwFalse;

	inspected;

	constructor(data,startLine) {
		this.id = +data[startLine].match(/Monkey (\d+):/)[1];
		this.items = eval(data[startLine+1].replace(/^ +Starting items: (.+)$/,'[$1]')).map(BigInt);
		this.operation = eval('old=>'+data[startLine+2].match(/new = (.*)$/)[1].replace(/(\d+)/g,'BigInt($1)'));
		this.divisible = BigInt(data[startLine+3].match(/divisible by (\d+)$/)[1]);
		this.throwTrue = +data[startLine+4].match(/throw to monkey (\d+)$/)[1];
		this.throwFalse = +data[startLine+5].match(/throw to monkey (\d+)$/)[1];

		this.inspected = 0;
	}

	inspect(monkeys,worryDiv) {
		while(this.items[0]) {
			var worryLevel = this.items.shift();
			//console.log(worryLevel);
			this.inspected++;

			worryLevel = this.operation(worryLevel)/(worryDiv?worryDiv:BigInt(1));
			if(worryLevel%this.divisible==0) {
				monkeys[this.throwTrue].items.push(worryDiv?worryLevel:worryLevel/this.divisible);
			} else {
				monkeys[this.throwFalse].items.push(worryLevel);
			}
		}
	}
}

class Solver {
	test = '';

	input = ['Monkey 0:',
	'  Starting items: 56, 52, 58, 96, 70, 75, 72',
	'  Operation: new = old * 17',
	'  Test: divisible by 11',
	'    If true: throw to monkey 2',
	'    If false: throw to monkey 3',
	'',
	'Monkey 1:',
	'  Starting items: 75, 58, 86, 80, 55, 81',
	'  Operation: new = old + 7',
	'  Test: divisible by 3',
	'    If true: throw to monkey 6',
	'    If false: throw to monkey 5',
	'',
	'Monkey 2:',
	'  Starting items: 73, 68, 73, 90',
	'  Operation: new = old * old',
	'  Test: divisible by 5',
	'    If true: throw to monkey 1',
	'    If false: throw to monkey 7',
	'',
	'Monkey 3:',
	'  Starting items: 72, 89, 55, 51, 59',
	'  Operation: new = old + 1',
	'  Test: divisible by 7',
	'    If true: throw to monkey 2',
	'    If false: throw to monkey 7',
	'',
	'Monkey 4:',
	'  Starting items: 76, 76, 91',
	'  Operation: new = old * 3',
	'  Test: divisible by 19',
	'    If true: throw to monkey 0',
	'    If false: throw to monkey 3',
	'',
	'Monkey 5:',
	'  Starting items: 88',
	'  Operation: new = old + 4',
	'  Test: divisible by 2',
	'    If true: throw to monkey 6',
	'    If false: throw to monkey 4',
	'',
	'Monkey 6:',
	'  Starting items: 64, 63, 56, 50, 77, 55, 55, 86',
	'  Operation: new = old + 8',
	'  Test: divisible by 13',
	'    If true: throw to monkey 4',
	'    If false: throw to monkey 0',
	'',
	'Monkey 7:',
	'  Starting items: 79, 58',
	'  Operation: new = old + 6',
	'  Test: divisible by 17',
	'    If true: throw to monkey 1',
	'    If false: throw to monkey 5'
	];

	monkeys;

	parse(data) {
		this.monkeys = [];
		for(let i=0;i<data.length;) {
			if(data[i].match(/^Monkey \d+:$/)) {
				this.monkeys.push(new Monkey(data,i));
				i += 6;
			} else {
				i++;
			}
		}
	}

	part(rounds,worryDiv) {
		this.parse(this.input);
		for(let round=0;round<rounds;round++) {
			if(round%100==0) {
				console.log(round);
			}
			this.monkeys.forEach(m=>m.inspect(this.monkeys,worryDiv));
		}

		var sorted = [...this.monkeys].sort((a,b)=>b.inspected-a.inspected);
		console.log(this.monkeys);
		return sorted[0].inspected*sorted[1].inspected;
	}

	solve() {
		console.log('part1',this.part(20,BigInt(3)));
		console.log('part2',this.part(10000,null));
	}
}

new Solver().solve();