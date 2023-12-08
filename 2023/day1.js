//DAY1

//P1

var r = 0
document.body.textContent.split('\n').map(l=>l.replace(/\D/g,'')).forEach(line=>{
    if(line.length>0) {
        console.error(line[0]+line[line.length-1])
        r += +(line[0]+line[line.length-1])
    }
})
console.log(r)

//P2

var r = 0
var nums = [['one',1],['two',2],['three',3],['four',4],['five',5],['six',6],['seven',7],['eight',8],['nine',9]]
function first(l) {
    var index = l.length;
    var value = 0;

    nums.forEach(n=>{
        var indexLetter = l.indexOf(n[0])
        if(indexLetter>-1 && indexLetter<index) {
            index = indexLetter
            value = n[1]
        }
        var indexNumber = l.indexOf(''+n[1])
        if(indexNumber>-1 && indexNumber<index) {
            index = indexNumber
            value = n[1]
        }

    })

    return value;
}

function last(l) {
    var index = -1;
    var value = 0;

    nums.forEach(n=>{
        var indexLetter = l.lastIndexOf(n[0])
        if(indexLetter>-1 && indexLetter>index) {
            index = indexLetter
            value = n[1]
        }
        var indexNumber = l.lastIndexOf(''+n[1])
        if(indexNumber>-1 && indexNumber>index) {
            index = indexNumber
            value = n[1]
        }

    })

    return value;
}

document.body.textContent.split('\n')
    .forEach(l=>{
        if(l.length==0) return;
        console.error(l)
        var num = first(l)+''+last(l)
       
        console.error('>>>>',num)
        r += +num
    })
console.log(r)