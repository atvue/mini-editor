

export const numReg = /^-?\d+(\.\d+)?$/;

export function isNumber(num) {
    return numReg.test(num);
}