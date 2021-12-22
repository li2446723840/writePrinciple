let obj = {
  a: 11
}
function fn(a, b, c, d) {
  console.log(this.a);
  console.log(a, b, c, d);
}
// 手写bind1
// Function.prototype.myBind = function (obj) {
//   let args = [...arguments].slice(1)
//   return () => {
//     return this.apply(obj, args)
//   }
// }


// 手写bind2
Function.prototype.myBind = function (oThis) {
  if (typeof this !== "function") {
    throw new TypeError("myBind绑定的不是一个函数")
  }
  let args = [...arguments].slice(1);
  let fToBind = this;
  let fNOP = function () { };
  let fBound = function () {
    return fToBind.apply((this instanceof fNOP && oThis ? this : oThis), args)
  }
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}

let res = fn.myBind(obj, "a", "b", "c", "d");
console.log(res());