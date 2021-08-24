
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

        let resolve = (value) => {
            if (this.status === STATUS.pendding) {
                this.status = STATUS.fulfilled;
                this.value = value;
            }
        }

        let reject = (reason) => {
            if (this.status === STATUS.pendding) {
                this.status = STATUS.rejected;
                this.reason = reason;
            }
        }
        try {
            execute(resolve, reject);
        }catch(e) {
            reject(e);
        }
    }
}





let p = new PromiseA((resolve, reject) => {
    resolve(2);
})