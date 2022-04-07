import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImmiStatistics } from '../../components/ImmiStatistics';

describe("Immigration Statistics Page", () => {

    it('Renders component without issue', () => {
        render(<ImmiStatistics />);
    });
});

