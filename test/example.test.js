const f = require(`../src/index`);

describe("Example testing", () => {
    test('Testing', () => {
        const msg = f();
        expect(msg).not.toBe(`hey`);
        expect(msg).toBe(`👋 🌎`);
    });
});
