// let obj = {
//     a: 1,
//     b: function() {
//         console.log(this.a, '11111');
//     },
//     c: {
//         a: 2,
//         b: function() {
//             console.log(this.a, '22222');
//         }
//     }
// }

// obj.b();

// obj.c.b();

// document.getElementById = function(id) {
//     this.id = id;
// };


// Function.prototype.before = function(beforeFn) {
//     var _self = this;
//     return function() {
//         beforeFn.apply(this, arguments);
//         return _self.apply(this, arguments); // document.getElementById.apply(this, arguments);
//     }
// }

// document.getElementById.before(() => {

// });


var a = 1;

var obj = {
    a: 2,
    b: function() {
        console.log(this.a);
    }
}

// console.log(window, 'window');

// obj.b.apply(window);

console.log(a);





