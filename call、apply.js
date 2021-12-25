let obj = {
  age: 11
}
function fn(a) {
  console.log(a);
  console.log(this.age);
}
// 手写call
Function.prototype.myCall = function (context) {
  let args = [...arguments].slice(1);
  let target = context || window;
  let flag = Symbol();
  target[flag] = this;
  target[flag](...args);
  delete target[flag]
}
fn.myCall(obj, 1, 2)

// 手写apply
Function.prototype.myApply = function (context, args) {
  let target = context || window;
  let flag = Symbol();
  target[flag] = this;
  target[flag](args);
  delete target[flag]
}
fn.myApply(obj, [1, 2, 3])