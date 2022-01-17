export function intToOrdinal(num:string | number) {
    const n = num.toString();
    const lastDigit = n[n.length - 1];
    if (lastDigit === '1') {
        return n + 'st';
    } else if (lastDigit === '2') {
        return n + 'nd';
    } else if (lastDigit === '3') {
        return n + 'rd';
    } else {
        return n + 'th';
    }
};