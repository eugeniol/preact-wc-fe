const window = global.window;
window.customElements = { define: jest.fn() };

export default { window };
