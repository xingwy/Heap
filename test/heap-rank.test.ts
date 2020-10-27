import * as Heap from "../index";

class TestRankData implements Heap.RankElement {
    __pointer: number;
    __rank: number;

    unique: number;
    value: string;
    constructor (u: number, v: string) {
        this.unique = u;
        this.value = v;
    }
}

let heap_array = new Heap.HeapRank<TestRankData>((l: TestRankData, r: TestRankData) => l.unique > r.unique ? true : false, 10);
let a = new TestRankData(1, "a");
let b = new TestRankData(2, "b");
let c = new TestRankData(3, "c");
heap_array.push(a);
heap_array.push(b);
heap_array.push(c);
console.dir(heap_array.getDatas(), 9);
heap_array.remove(b);
console.dir(heap_array.getDatas(), 9);