import { _heap_element, _compartor } from "./base"

class HeapArray<T extends _heap_element> {
    private readonly _datas: Array<T>;
    private readonly _compartor: _compartor<T>;

    constructor(c: _compartor<T>) {
        this._compartor = c;
        this._datas = new Array<T>();
    }

    // 弹出堆顶值
    public pop(): T {
        let r: T = this._datas[0];
        let v: T = this._datas.pop();
        
        // 调整堆
        this.shiftdown(0, v);
        return r; 
    }

    // 堆顶值
    public top(): T {
        return this._datas[0];
    }

    // 堆大小
    public size(): number {
        return this._datas.length;
    }

    // 获取所有数据
    public getDatas(): Array<T> {
        return this._datas;
    }

    public clear(): void {
        this._datas.length = 0;
    }

    /**
     * 新增数据
     * @param v 
     */
    public push(v: T): void {
        this._datas.push(v);
        this.shiftup(this._datas.length-1, v);
    }

    /**
     * 移除数据
     * @param v 
     */
    public remove(v: T): void {
        let pointer: number = v.__pointer;
        if (pointer >= this._datas.length) {
            return;
        }
        if (this._datas[pointer] != v) {
            return;
        }
        let r: T = this._datas.pop();
        
        if (pointer < this._datas.length) {
            // 重整堆
            this.shiftdown(pointer, r);
        }
    }

    /**
     * 移除数据
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

    private shiftup(_p: number, _v: T): void {
        let f: number = (_p - 1) >> 1;
        let v: T;

        while (0 != _p) {
            v = this._datas[f];
            if (!this.compartor(_v, v)) {
                break;
            }
            // 递归父节点
            _v.__pointer = _p;
            this._datas[_p] = v;
            _p = f;
            f = (_p - 1) >> 1;
        }

        _v.__pointer = _p;
        this._datas[_p] = _v;
    }

    /**
     * 目标值替换，元素下调
     * @param point 
     * @param v 
     */
    private shiftdown(_p: number, _v: T): void {
        let l: number = (_p << 1) + 1;
        let r: number = l + 1;
        let c: number = this._datas.length;
        let v: T;

        while (l < c) {
            v = this._datas[l];
            // 获取左右节点优先值
            if (r < c && this.compartor(this._datas[r], v)) {
                v = this._datas[r];
                l = r;
            }

            if (this.compartor(_v, v)) {
                break;
            }

            // 迭代
            v.__pointer = _p;
            this._datas[_p] = v;
            _p = l;
            l = (_p << 1) + 1;
            r = l + 1;
        }

        // 更新目标节点指针
        _v.__pointer = _p;
        this._datas[_p] = _v;
    }
}

export { HeapArray as _heap_array };
