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
{
    "root": {
        "key": 11,
        "left": {
            "key": 7,
            "left": {
                "key": 5,
                "left": {
                    "key": 3,
                    "left": null,
                    "right": null
                },
                "right": {
                    "key": 6,
                    "left": null,
                    "right": null
                }
            },
            "right": {
                "key": 9,
                "left": {
                    "key": 8,
                    "left": null,
                    "right": null
                },
                "right": {
                    "key": 10,
                    "left": null,
                    "right": null
                }
            }
        },
        "right": {
            "key": 15,
            "left": {
                "key": 13,
                "left": {
                    "key": 12,
                    "left": null,
                    "right": null
                },
                "right": {
                    "key": 14,
                    "left": null,
                    "right": null
                }
            },
            "right": {
                "key": 20,
                "left": {
                    "key": 18,
                    "left": null,
                    "right": null
                },
                "right": {
                    "key": 25,
                    "left": null,
                    "right": null
                }
            }
        }
    }
}
