interface HeapElement {
    __pointer: number;
}

interface RankElement extends HeapElement {
    __rank: number;
}

type Compartor<T extends HeapElement> = (l: T, r: T) => boolean;

export { HeapElement as _heap_element, RankElement as _rank_element, Compartor as _compartor };