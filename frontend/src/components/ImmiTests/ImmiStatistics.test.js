import React, { useEffect, useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ImmiStatistics } from '../../components/ImmiStatistics';
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import store from '../../store';

describe("Immigration Statistics Page", () => {

    it('Renders component without issue', () => {
        render(<ImmiStatistics />);
    });
    it('Displays zero when no users passed', () => {
        render(<ImmiStatistics />);
        const countCases = screen.getByTestId('immi-stats-count-cases');
        const countPatients = screen.getByTestId('immi-stats-count-patients');
        const countMessages = screen.getByTestId('immi-stats-count-messages');
        const countAppointments = screen.getByTestId('immi-stats-count-appointments');
        const countCovidCases = screen.getByTestId('immi-stats-count-covid-cases');

        expect(parseInt(countCases.innerHTML)).toBe(57);
        expect(parseInt(countPatients.innerHTML)).toBe(0);
        expect(parseInt(countMessages.innerHTML)).toBe(12);
        expect(parseInt(countAppointments.innerHTML)).toBe(6);
        expect(parseInt(countCovidCases.innerHTML)).toBe(NaN);

    });
    it('Displays correct counts if users passed', async () => {
        let all_users = [
            {
                _id: "testId",
                name: 'testName',
                lname: 'testLName',
                email: 'test@email',
                count: 29,
                roles: { name: 'admin' },
                covidStatus: 'negative',
                your_doctor: { name: "testDoctorName" }
            }
        ];
        let doctors = [{ name: 'testDoctor' }];
        let users_to_confirm = [{ name: 'test' }];
        render(<Provider store={store}><MemoryRouter><ImmiStatistics
            doctors={doctors} all_users={all_users} users_to_confirm={users_to_confirm} /></MemoryRouter></Provider>);
        const countCases = screen.getByTestId('immi-stats-count-cases');
        const countPatients = screen.getByTestId('immi-stats-count-patients');
        const countMessages = screen.getByTestId('immi-stats-count-messages');
        const countAppointments = screen.getByTestId('immi-stats-count-appointments');
        const countCovidCases = screen.getByTestId('immi-stats-count-covid-cases');

        expect(parseInt(countCases.innerHTML)).toBe(57);
        expect(parseInt(countPatients.innerHTML)).toBe(0);
        expect(parseInt(countMessages.innerHTML)).toBe(12);
        expect(parseInt(countAppointments.innerHTML)).toBe(6);
        expect(parseInt(countCovidCases.innerHTML)).toBe(NaN);
    });
});

