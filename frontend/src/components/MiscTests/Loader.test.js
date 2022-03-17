import { render, cleanup } from '@testing-library/react';
import { Loader } from '../Loader';
import '@testing-library/jest-dom'


describe("Loader component", () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(<Loader />);
    });
});
