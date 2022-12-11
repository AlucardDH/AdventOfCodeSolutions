
class Operation {
	static DURATIONS = {
		'addx':3,
		'noop':1
	};

	name;
	value;

	constructor(name,value) {
		this.name = name;
		this.value = +value;
	}

	getDuration() {
		return Operation.DURATIONS[this.name] || 0;
	}

}

class Device {
	cycle;
	register;

	currentOperation;
	currentOperationRemainingCycle;

	cycleEnd;

	constructor() {
		this.cycle = 1;
		this.register = 1;
	}

	onCycleEnd(cycleEnd) {
		this.cycleEnd = cycleEnd;
	}

	increaseCycle() {
		this.cycle++;
		if(this.currentOperation) {
			this.currentOperationRemainingCycle--;
			if(this.currentOperationRemainingCycle<=0) {
				if(this.currentOperation.name=='addx') {
					this.register += this.currentOperation.value;
				//	console.log('Cycle',this.cycle,'add',this.currentOperation.value,'Register=',+this.register);
				}
				this.currentOperation = null;
			}
		}
		if(this.cycleEnd) {
			this.cycleEnd(this);
		}
	}

	execute(operation) {
		this.currentOperation = operation;
		this.currentOperationRemainingCycle = operation.getDuration()-1;
	}

	run(program) {
		for(let i=0;i<program.length;i++) {
			this.execute(program[i]);
			while(this.currentOperation) {
				this.increaseCycle();
			}
		}
	}
}

class Solver {

	input = [
		'noop','addx 12','addx -5','addx -1','noop','addx 4','noop','addx 1','addx 4','noop','addx 13','addx -8','noop','addx -19','addx 24','addx 1','noop','addx 4','noop','addx 1','addx 5','addx -1','addx -37','addx 16','addx -13','addx 18','addx -11','addx 2','addx 23','noop','addx -18','addx 9','addx -8','addx 2','addx 5','addx 2','addx -21','addx 26','noop','addx -15','addx 20','noop','addx 3','noop','addx -38','addx 3','noop','addx 26','addx -4','addx -19','addx 3','addx 1','addx 5','addx 3','noop','addx 2','addx 3','noop','addx 2','noop','noop','noop','noop','addx 5','noop','noop','noop','addx 3','noop','addx -30','addx -4','addx 1','addx 18','addx -8','addx -4','addx 2','noop','addx 7','noop','noop','noop','noop','addx 5','noop','noop','addx 5','addx -2','addx -20','addx 27','addx -20','addx 25','addx -2','addx -35','noop','noop','addx 4','addx 3','addx -2','addx 5','addx 2','addx -11','addx 1','addx 13','addx 2','addx 5','addx 6','addx -1','addx -2','noop','addx 7','addx -2','addx 6','addx 1','addx -21','addx 22','addx -38','addx 5','addx 3','addx -1','noop','noop','addx 5','addx 1','addx 4','addx 3','addx -2','addx 2','noop','addx 7','addx -1','addx 2','addx 4','addx -10','addx -19','addx 35','addx -1','noop','noop','noop'
	].map(c=>new Operation(...c.split(' ')));

	test = [
		'addx 15','addx -11','addx 6','addx -3','addx 5','addx -1','addx -8','addx 13','addx 4','noop','addx -1','addx 5','addx -1','addx 5','addx -1','addx 5','addx -1','addx 5','addx -1','addx -35','addx 1','addx 24','addx -19','addx 1','addx 16','addx -11','noop','noop','addx 21','addx -15','noop','noop','addx -3','addx 9','addx 1','addx -3','addx 8','addx 1','addx 5','noop','noop','noop','noop','noop','addx -36','noop','addx 1','addx 7','noop','noop','noop','addx 2','addx 6','noop','noop','noop','noop','noop','addx 1','noop','noop','addx 7','addx 1','noop','addx -13','addx 13','addx 7','noop','addx 1','addx -33','noop','noop','noop','addx 2','noop','noop','noop','addx 8','noop','addx -1','addx 2','addx 1','noop','addx 17','addx -9','addx 1','addx 1','addx -3','addx 11','noop','noop','addx 1','noop','addx 1','noop','noop','addx -13','addx -19','addx 1','addx 3','addx 26','addx -30','addx 12','addx -1','addx 3','addx 1','noop','noop','noop','addx -9','addx 18','addx 1','addx 2','noop','noop','addx 9','noop','noop','noop','addx -1','addx 2','addx -37','addx 1','addx 3','noop','addx 15','addx -21','addx 22','addx -6','addx 1','noop','addx 2','addx 1','noop','addx -10','noop','noop','addx 20','addx 1','addx 2','addx 2','addx -6','addx -11','noop','noop','noop'
	].map(c=>new Operation(...c.split(' ')));

	

	part1(data) {
		var result = 0;

		var device = new Device();
		var watchedCycles = [20,60,100,140,180,220];

		device.onCycleEnd(d=>{
			if(watchedCycles.includes(d.cycle)) {
				var signalStrength = d.cycle*d.register;
			//	console.log(d.cycle,d.register,signalStrength);
				result += signalStrength;
			}
		});

		device.run(data);

		return result;
	}

	part2(data) {
		var height = 6;
		var width = 40;

		var screen = new Array(height).fill(0).map(r=>'.'.repeat(width).split(''));

		var device = new Device();

		device.onCycleEnd(d=>{
			var x = (d.cycle-1)%width;
			var y = Math.floor((d.cycle-1)/width);

			if(Math.abs(d.register-x)<=1) {
				screen[y][x] = '#';
			}
		});

		device.run(data);

		return screen.map(r=>r.join('')).join('\n');
	}

	solve() {
		console.log('part1',this.part1(this.input));
		console.log(this.part2(this.input));
	}
}

new Solver().solve();