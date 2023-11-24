export default class Utils{
    

    /**
     * Generates a pseudo-random number between min and max inclusive.
     * @param {number} min The minimum number that can be produced (inclusive).
     * @param {number} max The maximum number that can be produced (inclusive).
     * @return {number} A pseudo-random number between min and max inclusive.
     */
    static randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}