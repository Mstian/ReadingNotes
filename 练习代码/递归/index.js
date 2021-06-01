// 1. 递归阶乘

function Factorial(n){
    if(n <= 1) {
        return 1;
    }
    return n * Factorial(n-1);
}


let a = Factorial(5);
// console.log(a);

// 2. 迭代阶乘

function IteratorFac(n) {
    if(n <= 1) {
        return 1;
    }
    let total = 1;
    for (let i = n; i > 1; i--) {
        total = i * total;
    }
    return total;
}

let b = IteratorFac(5);
// console.log(b);


// 3. 斐波那契数列
// 0 1 1 2 3 5 8 13 21

// 迭代

function ItraterFabnici(n) {
    if(n === 0) {
        return 0
    }
    if(n >=1 && n<=2) {
        return 1;
    }
    let res = 1;
    let f1 = 0;
    let f2 = 1;
    for (let i = 2; i <= n; i++) {
        res = f1 + f2;
        f1 = f2;
        f2 = res;
    }
    return res;
}

let c = ItraterFabnici(5);

// console.log(c);

// 递归

function fibnaci(n) {
    if(n === 0) {
        return 0
    }
    if(n >=1 && n<=2) {
        return 1;
    }
    return fibnaci(n-1) + fibnaci(n-2);
}
// let d = ItraterFabnici(5);
// console.log(d);