function defaultCompare(a, b) {
    return a - b > 0 ? 'LEFT' : 'RIGHT';
}

class Node{
    constructor(key) {
        this.key = key;
        this.left = null; // 左侧子节点
        this.right = null; // 右侧子节点
    }
}

class BinarySearchTree{
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.root = null;
    }
    insert(key){
        if (!this.root) {
            this.root = new Node(key);
        } else {
            this.insertNode(this.root, key);
        }
    }
    insertNode(node, key) {
        if (this.compareFn(node.key, key) === 'LEFT') { // 向左边插
            if (!node.left) {
                node.left = new Node(key);
            } else {
                this.insertNode(node.left, key);
            }
        } else {
            if (!node.right) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key);
            }
        }
    }
    inOrderTraverse(cb) {
        this.inOrderTraverseNode(this.root, cb);
    }
    inOrderTraverseNode(node, callback) {
        if (node != null) {
            console.log(node, 'nodes');
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }
    preOrderTraverse(cb) {
        this.preOrderTraverseNode(this.root, cb);
    }
    preOrderTraverseNode(node, callback) {
        if(node != null) {
            callback(node.key);
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }
    postOrderTraverse(cb) {
        this.postOrderTraverseNode(this.root, cb);
    }
    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }
}


let binaryTree = new BinarySearchTree();

binaryTree.insert(11);
binaryTree.insert(7);
binaryTree.insert(15);
binaryTree.insert(5);
binaryTree.insert(3);
binaryTree.insert(9);
binaryTree.insert(8);
binaryTree.insert(10);
binaryTree.insert(13);
binaryTree.insert(12);
binaryTree.insert(14);
binaryTree.insert(20);
binaryTree.insert(18);
binaryTree.insert(25);

binaryTree.insert(6);
console.log(JSON.stringify(binaryTree));
// binaryTree 的树结构
// {
//     "root": {
//         "key": 11,
//         "left": {
//             "key": 7,
//             "left": {
//                 "key": 5,
//                 "left": {
//                     "key": 3,
//                     "left": null,
//                     "right": null
//                 },
//                 "right": {
//                     "key": 6,
//                     "left": null,
//                     "right": null
//                 }
//             },
//             "right": {
//                 "key": 9,
//                 "left": {
//                     "key": 8,
//                     "left": null,
//                     "right": null
//                 },
//                 "right": {
//                     "key": 10,
//                     "left": null,
//                     "right": null
//                 }
//             }
//         },
//         "right": {
//             "key": 15,
//             "left": {
//                 "key": 13,
//                 "left": {
//                     "key": 12,
//                     "left": null,
//                     "right": null
//                 },
//                 "right": {
//                     "key": 14,
//                     "left": null,
//                     "right": null
//                 }
//             },
//             "right": {
//                 "key": 20,
//                 "left": {
//                     "key": 18,
//                     "left": null,
//                     "right": null
//                 },
//                 "right": {
//                     "key": 25,
//                     "left": null,
//                     "right": null
//                 }
//             }
//         }
//     }
// }


// 中序遍历
// binaryTree.inOrderTraverse((val) => {
//     console.log(val);
// });
// binaryTree.preOrderTraverse((val) => {
//     console.log(val);
// });

binaryTree.postOrderTraverse((val) =>{
    console.log(val);
})


