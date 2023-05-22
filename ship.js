export default function Ship(length) {
    let hits = 0;
    function hit() {
        if (hits >= length) return false;
        hits++;
        return hits;
    }
    function isSunk() {
        return hits === length;
    }
    return {
        hit,
        isSunk,
        length
    };
}
