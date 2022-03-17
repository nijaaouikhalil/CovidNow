import { render, cleanup } from '@testing-library/react';
import { DoctorPatientsList } from '../../components/DoctorPatientsList';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'


describe("Table displaying all a doctor's patients", () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(<DoctorPatientsList patients={[]} />);
    });

    it('renders empty table when passed empty array', () => {
        const { queryByTestId } = render(<DoctorPatientsList patients={[]} />)
        const tableBody = queryByTestId('doctor-all-users-table-body');
        const tableRow = queryByTestId('doctor-all-users-table-row');
        expect(tableBody).not.toContainElement(tableRow);
    });

    it('renders rows in table when passed array of users', () => {
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
        ]
        const { queryByTestId } = render(<MemoryRouter><DoctorPatientsList patients={all_users} /></MemoryRouter>)
        const tableBody = queryByTestId('doctor-all-users-table-body');
        const tableRow = queryByTestId('doctor-all-users-table-row');
        expect(tableBody).toContainElement(tableRow);
    });
});
