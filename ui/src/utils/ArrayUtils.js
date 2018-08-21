export class ArrayUtil {
    static isEqual(array1, array2) {
        return array1.length === array2.length && array1.every((v, i) => v === array2[i]);
    }

    static isDuplicate(array) {
        const sortedArray = array.slice().sort();
        const results = [];
        for (let i = 0; i < array.length - 1; i++) {
            if (sortedArray[i + 1] === sortedArray[i]) {
                results.push(sortedArray[i]);
            }
        }
        return (results.length > 0);
    }

    static isSubSet(smallerArray, biggerArray) {
        return smallerArray.every(item => biggerArray.includes(item));
    }

    static uniq(a) {
        // return Array.from(new Set(a));
        return [...new Set(a)];
    }

    static findPositionToInsert(array, value) {
        let low = 0;
        let high = array.length;

        while (low < high) {
            const mid = low + high >>> 1;
            if (array[mid] < value) low = mid + 1;
            else high = mid;
        }
        return low;
    }

    static chunk(perChunk, inputArray) {
        return inputArray.reduce((all, one, i) => {
            const ch = Math.floor(i / perChunk);
            all[ch] = [].concat((all[ch] || []), one);
            return all;
        }, []);
    }
}
