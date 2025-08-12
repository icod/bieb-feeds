import { differenceInDays, hash } from "../src/cache-helper.js";

describe('cache helper functions:', () => {

    describe('hash', () => {
        it('should hash a given string using sha1-hex', () => {
            const data = 'test';
            expect(hash(data)).toEqual('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
        });

        it('should not hash undefined', () => {
            const data = undefined;
            expect(hash(data)).toBeUndefined();
        });

        it('should hash empty string', () => {
            const data = "";
            const result = hash(data);
            expect(result).toBeDefined();
            expect(result).toEqual("da39a3ee5e6b4b0d3255bfef95601890afd80709");
        });
    });

    describe('differenceInDays', () => {
        it('should calculate difference in days', () => {
            const date1 = new Date('2025-01-01 00:00:00');
            const date2 = new Date('2025-01-02 00:00:00');
            expect(differenceInDays(date1, date2)).toEqual(1);
            expect(differenceInDays(date2, date1)).toEqual(1);
        });

        it('should calculate difference in days as 0, if dates are within the same 24 hours', () => {
            const date1 = new Date('2025-01-01 12:00:01');
            const date2 = new Date('2025-01-02 12:00:00');
            expect(differenceInDays(date1, date2)).toEqual(0);
        });
    });
});
