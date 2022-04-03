import React, { useEffect, useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DoctorStatistics } from '../../components/DoctorStatistics';
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import store from '../../store';

describe("Doctor Statistics Page", () => {

    it('Renders component without issue', () => {
        render(<Provider store={store}><MemoryRouter><DoctorStatistics
            patients={[]} /></MemoryRouter></Provider>);
    });
    it('Displays zero when no users passed', () => {
        render(<Provider store={store}><MemoryRouter><DoctorStatistics
            patients={[]} /></MemoryRouter></Provider>);

        const countCases = screen.getByTestId('doctor-stats-count-cases');
        const countPatients = screen.getByTestId('doctor-stats-count-patients');
        const countMessages = screen.getByTestId('doctor-stats-count-messages');
        const countAppointments = screen.getByTestId('doctor-stats-count-appointments');
        const countCovidCases = screen.getByTestId('doctor-stats-count-covid-cases');

        expect(parseInt(countCases.innerHTML)).toBe(1234);
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
        render(<Provider store={store}><MemoryRouter><DoctorStatistics
            patients={all_users} /></MemoryRouter></Provider>);
        const countCases = screen.getByTestId('doctor-stats-count-cases');
        const countPatients = screen.getByTestId('doctor-stats-count-patients');
        const countMessages = screen.getByTestId('doctor-stats-count-messages');
        const countAppointments = screen.getByTestId('doctor-stats-count-appointments');
        const countCovidCases = screen.getByTestId('doctor-stats-count-covid-cases');

        expect(parseInt(countCases.innerHTML)).toBe(1234);
        expect(parseInt(countPatients.innerHTML)).toBe(1);
        expect(parseInt(countMessages.innerHTML)).toBe(12);
        expect(parseInt(countAppointments.innerHTML)).toBe(6);
        expect(parseInt(countCovidCases.innerHTML)).toBe(NaN);
    });
});