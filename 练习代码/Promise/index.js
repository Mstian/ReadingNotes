
/** 
 * 1. 三个状态
 * 2. then方法
 * 3. new Promise立即执行
 * 4. 状态不可逆
 * 5. 异常走失败
 * */

const STATUS = {
    pendding: 'PENDDING',
    fulfilled: 'FULFILLED',
    rejected: 'REJECTED'
}

class PromiseA {
    constructor(execute) {
        this.status = STATUS.pendding; // 状态
        this.value = undefined; // 成功值
        this.reason = undefined; // 失败原因

        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = (value) => {
            if (this.status === STATUS.pendding) {
                this.status = STATUS.fulfilled;
                this.value = value;
                this.onFulfilledCallbacks.forEach((fn) => {
                    fn();
                })
            }
        }

        let reject = (reason) => {
            if (this.status === STATUS.pendding) {
                this.status = STATUS.rejected;
                this.reason = reason;
                this.onRejectedCallbacks.forEach((fn) => {
                    fn();
                })
            }
        }
        try {
            execute(resolve, reject);
        }catch(e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected){
        if (this.status === STATUS.fulfilled) {
            onFulfilled(this.value);
        }
        if (this.status === STATUS.rejected) {
            onRejected(this.reason);
        }
        if (this.status ===  STATUS.pendding) {
            this.onFulfilledCallbacks.push(() => {
                onFulfilled(this.value);
            });
            this.onRejectedCallbacks.push(() => {
                onRejected(this.value);
            });
        }
    }
}





let p = new PromiseA((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    },1000)
})
p.then((val) => {
    console.log(val, 'testthen')
}, (e) => {
    console.log(e, 'test')
})
p.then((val) => {
    console.log(val, '222')
})