// Array.prototype.myReduce = function(callback, initialValue) {
//         let accumulator = initialValue === undefined ? undefined : initialValue
//         for (let i = 0; i < this.length; i++) {
//             if (accumulator !== undefined) {
//                 accumulator = callback(accumulator, this[i], i, this)
//             } else {
//                 accumulator = this[i]
//             }
//         }
//         return accumulator
// }

// let arr = [1,2,3,4,5];

// let result = arr.myReduce(function(acc,value,index,arr){
//     return acc + value;
// },1)

// console.log(result)

let a = ["a", "b"]
a[2] = a
console.log(a)
function f(a) {
    console.log(a)
    a = a[2]
    console.log("thisss", a);
    let n = Array("a", "b")
    console.log(a[2] = n);
    console.log(a);
    console.log(n);
    a = n;
    console.log(a);
}
console.log(a);
f(a)
console.log(a);