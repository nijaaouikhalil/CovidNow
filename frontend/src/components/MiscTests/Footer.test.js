import { render, cleanup } from '@testing-library/react';
import { Footer } from '../Footer';
import '@testing-library/jest-dom'


describe("Footer component", () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(<Footer />);
    });
});
