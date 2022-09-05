import { merge, capitalize } from 'lodash';

export function intToOrdinal(num:string | number) {
    const n = num.toString();
    const lastDigit = n[n.length - 1];
    if (n.length >= 2 && n[n.length - 2] === '1') {
        return n + 'th';
    }
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

export function snakeCaseToWords(str:string) {
    return str.split('_').map( word => capitalize(word) ).join(' ')
}

export function moveObjKey(obj:object, key:string, dir:1 | -1) {
    const newObj = {};
    const keys = Object.keys(obj);
    const index = keys.indexOf(key);
    const swapIndex = index + (1 * dir);
    if (swapIndex >= keys.length || swapIndex < 0) { return obj }
    keys.forEach( (key, i) => {
        if (i === swapIndex) {
            const otherKey = keys[index];
            newObj[otherKey] = obj[otherKey];
        }
        if (i === index) {
            const otherKey = keys[swapIndex];
            newObj[otherKey] = obj[otherKey];
        }
        if (i !== index && i !==swapIndex) {
            newObj[key] = obj[key];
        }
    });
    return newObj;
}

export function renameObjKey(obj:object, keyToRename:string, newName:string) {
    const newObj = {};
    const keys = Object.keys(obj);
    keys.forEach( (key) => {
        if (key === keyToRename) {
            newObj[newName] = obj[key];
        } else {
            newObj[key] = obj[key];
        }
    });
    return newObj;
}

export function spaceship(a:any, b:any) {
    if (a > b) {
        return 1;
    } else if (b > a) {
        return -1;
    } else {
        return 0;
    }
}