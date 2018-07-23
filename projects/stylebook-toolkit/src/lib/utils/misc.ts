export function removeDuplicates<T>(arr: T[], key: any): T[] {
    const obj = {};
    for (let i = 0, len = arr.length; i < len; i++) {
        if (!obj[arr[i][key]]) obj[arr[i][key]] = arr[i];
    }
    const newArr = [];
    for (const k in obj) newArr.push(obj[k]);
    return newArr;
}

export function stringToAnchorLink(title: string): string {
    return title.replace(/[^A-Z0-9]+/gi, '_').toLowerCase();
}
