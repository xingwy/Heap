import * as Heap from "../index";

class TestHeapData implements Heap.HeapElement {
    __pointer: number;

    unique: number;
    value: string;
    constructor (u: number, v: string) {
        this.unique = u;
        this.value = v;
    }
}

let heap_array = new Heap.HeapArray<TestHeapData>((l: TestHeapData, r: TestHeapData) => l.unique > r.unique ? true : false);
let a = new TestHeapData(1, "a");
let b = new TestHeapData(2, "b");
let c = new TestHeapData(3, "c");
heap_array.push(a);
heap_array.push(b);
heap_array.push(c);
console.dir(heap_array.getDatas(), 9);
heap_array.remove(b);
console.dir(heap_array.getDatas(), 9);
