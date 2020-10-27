import { _rank_element, _compartor } from "./base"
import { _heap_array } from "./heap-array";
class HeapRank<T extends _rank_element> {
    private readonly _rank: Array<T>;
    private readonly _rankHeap: _heap_array<T>;
    private readonly _compartor: _compartor<T>;
    private readonly _rankSize: number;

    constructor(c: _compartor<T>, rankSize) {
        this._compartor = c;
        this._rank = new Array<T>();
        this._rankHeap = new _heap_array<T>(c);
        this._rankSize = rankSize;
    }

     // 弹出堆顶值
     public pop(): T {
        // 调整堆
        let v = this._rankHeap.pop();
        return v; 
    }

    // 堆顶值
    public top(): T {
        return this._rankHeap.top();
    }

    // 堆大小
    public size(): number {
        return this._rankHeap.size();
    }

    // 获取所有数据
    public getDatas(): Array<T> {
        return this._rankHeap.getDatas();
    }

    // 清除堆
    public clear(): void {
        this._rankHeap.clear();
    }

    /**
     * 新增数据
     * @param v 
     */
    public push(v: T): void {
        this._rankHeap.push(v);
    }

    /**
     * 移除数据
     * @param v 
     */
    public remove(v: T): void {
        if (v.__rank == 0) {
            this._rankHeap.remove(v);
            return;
        } else {
            this._rank.splice(v.__rank - 1, 1);
        }
        return this.onUpdateRank();
    }

    /**
     * 更新数据
     * @param v 
     */
    public update(v: T): void {
        return null;
    }

    /**
     * 比较器
     * @param v 当前值
     * @param t 比较值
     */
    private compartor(v: T, t: T): boolean {
        return this._compartor(v, t);
    }

    // 更新排行
    private onUpdateRank(): void {
        // 维护排行
        let tailIndex = this._rank.length - 1;
        if (tailIndex < this._rankSize - 1) {
            if (this._rankHeap.size() == 0) {
                return;
            }

            let top = this._rankHeap.pop();
            top.__rank = tailIndex + 2;
        } else {
            if (this._rankHeap.size() == 0) {
                return;
            }
            let tail = this._rank[tailIndex];
            let top = this._rankHeap.pop();
            if (this.compartor(tail, top)) {
                this._rank[tailIndex] = top;
                this._rank.sort((l: T, r: T): number => this.compartor(l, r) ? -1 : 1)
                this._rank.forEach((v: T, index: number): void => {
                    v.__rank = index + 1;
                });
                tail.__rank = 0;
                this._rankHeap.push(tail);
            }
        }
    }
}

export { HeapRank as _heap_rank };