export class Coord {
    static RANGE_X = null;
    static RANGE_Y = null;
    static CACHE = new Map();

    static get(x,y) {
        if(Coord.RANGE_X && (x<Coord.RANGE_X[0] || x>Coord.RANGE_X[1])) return null;
        if(Coord.RANGE_Y && (y<Coord.RANGE_Y[0] || y>Coord.RANGE_Y[1])) return null;
        var key = x+','+y;
        var result = Coord.CACHE.get(key)
        if(!result) {
            result = new Coord(x,y);
            Coord.CACHE.set(key,result);
        }
        return result;
    }

    x;
    y;

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    add(dx,dy) {
        return Coord.get(this.x+dx,this.y+dy);
    }

    distanceX(other) {
        return Math.abs(this.x-other.x);
    }

    distanceY(other) {
        return Math.abs(this.y-other.y);
    }
}