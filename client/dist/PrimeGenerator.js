function* PrimeGenerator() {
    var i = [2];
    var j = 0;
    var count = 5;
    while (count--) {
        let diff = [1, 2, 4, 5, 6, 7].find((val) => {
            let num = i[j] + val;
            return !i.some((prime) => num % prime == 0);
        }) || 0;
        //generate next prime number
        i.push(i[j] + diff);
        yield i[j++];
    }
}
var g = PrimeGenerator();
let k = 15;
while (--k)
    console.log(g.next());
const someObj = {
    *[Symbol.iterator]() {
        var i = [2];
        var j = 0;
        var count = 5;
        while (count--) {
            let diff = [1, 2, 4, 5, 6, 7].find((val) => {
                let num = i[j] + val;
                return !i.some((prime) => num % prime == 0);
            }) || 0;
            //generate next prime number
            i.push(i[j] + diff);
            yield i[j++];
        }
    }
};
for (let k of someObj) {
    console.log("HAHA", k);
}
