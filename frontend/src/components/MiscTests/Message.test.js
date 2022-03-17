import { render, cleanup } from '@testing-library/react';
import { Message } from '../Message';
import '@testing-library/jest-dom'


describe("Loader component", () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(<Message />);
    });
});
