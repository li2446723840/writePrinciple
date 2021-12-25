class MyPromise {
  constructor(func) {
    this.status = "pending";
    this.reslut = null;
    this.resloveCallback = [];
    this.rejectCallback = [];
    try {
      func(this.reslove.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reslut = err;
      this.reject();
    }
  }
  reslove(result) {
    setTimeout(() => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.result = result;
        this.resloveCallback.forEach(callback => {
          callback(this.reslut);
        });
      }
    });
  }
  reject(result) {
    setTimeout(() => {
      if (this.status === "pending") {
        this.status = "reject";
        this.result = result;
        this.rejectCallback.forEach(callback => {
          callback(this.reslut);
        });
      }
    });
  }
  then(onFulfilled, onReject) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : () => {};
    onReject = typeof onReject === "function" ? onReject : () => {};
    return new MyPromise(() => {
      if (this.status === "pending") {
        this.resloveCallback.push(onFulfilled);
        this.rejectCallback.push(onReject);
      }
      if (this.status === "fulfilled") {
        setTimeout(() => {
          onFulfilled(this.reslut);
        });
      }
      if (this.status === "reject") {
        setTimeout(() => {
          onReject(this.reslut);
        });
      }
    });
  }
  catch(onReject) {
    if (this.status === "pending") {
      this.rejectCallback.push(onReject);
    }
    if (this.status === "reject") {
      setTimeout(() => {
        onReject(this.reslut);
      });
    }
  }
}
let commitment = new MyPromise((reslove, reject) => {
  setTimeout(() => {
    let res = { code: 10401, data: [] };
    if (res.code === 2000) reslove("成功");
    else reject("失败");
  });
}).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
})
