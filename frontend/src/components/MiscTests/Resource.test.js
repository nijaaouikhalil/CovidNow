import { render, screen } from '@testing-library/react';
import { Resource } from '../Resource';
import '@testing-library/jest-dom'


describe("Resource component", () => {
    it('Renders passed props correctly', () => {
        const res = {
            title: "testTitle",
            details: "testDetails",
            link: "testLink"
        }
        render(<Resource resource={res}/>);
        const title = screen.getByTestId('resource-title-test');
        const detail = screen.getByTestId('resource-detail-test');
        const link = screen.getByTestId('resource-link-test');
        expect(title.innerHTML).toBe('testTitle');
        expect(detail.innerHTML).toBe('testDetails');
        expect(link.href).toBe('http://localhost/testLink');
    });
});
