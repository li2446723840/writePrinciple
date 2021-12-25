class MyPromise {
  // static pending fulfilled reject
  constructor(func) {
    this.status = "pending"
    this.result = null;
    this.resloveCallback = [];
    this.rejectCallback = [];
    try {
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(result) {
    setTimeout(() => {
      if (this.status === "pending") {
        this.status = "fulfilled"
        this.result = result;
        this.resloveCallback.forEach(callback => {
          callback()
        })
      }
    }, 0)
  }
  reject(result) {
    setTimeout(() => {
      if (this.status === "pending") {
        this.status = "reject"
        this.result = result;
        this.rejectCallback.forEach(callback => {
          callback()
        })
      }
    }, 0);
  }
  then(onFulfilled, onReject) {
    return new MyPromise((reslove, reject) => {
      onFulfilled = typeof onFulfilled === "function" ? onFulfilled : () => { }
      onReject = typeof onReject === "function" ? onReject : () => { }
      if (this.status === "pending") {
        this.resloveCallback.push(onFulfilled)
        this.rejectCallback.push(onReject)
      }
      if (this.status === "fulfilled") {
        setTimeout(() => {
          onFulfilled(this.result)
        }, 0)
      }
      if (this.status === "reject") {
        setTimeout(() => {
          onReject(this.result)
        }, 0)
      }
    })
  }
}
let jianli = new MyPromise((reslove, reject) => {
  // throw new Error("失敗")
  setTimeout(() => {
    reslove("這是一個接口")
  }, 0)
}).then((res)=> {
  console.log(res);
})