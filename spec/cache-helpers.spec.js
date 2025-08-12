import { hash } from "../src/cache-helper.js";

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
});
