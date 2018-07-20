import { removeDuplicates } from './misc';

describe('Misc Utils', () => {
    it('#removeDuplicates should remove duplicate objects by key', () => {
        const input = [{ a: 11, b: 2 }, { a: 3, b: 4 }, { a: 11, b: 4 }];
        expect(removeDuplicates(input, 'b')).toEqual([{ a: 11, b: 2 }, { a: 3, b: 4 }]);
        expect(removeDuplicates(input, 'a')).toEqual([{ a: 3, b: 4 }, { a: 11, b: 2 }]);
    });
});
