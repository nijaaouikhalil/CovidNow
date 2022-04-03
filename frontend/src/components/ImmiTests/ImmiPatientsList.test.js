import { render, cleanup } from '@testing-library/react';
import { ImmiPatientsList } from '../../components/ImmiPatientsList';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'


describe("Table displaying an immi patients list", () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(<ImmiPatientsList all_users={[]} />);
    });

    it('renders empty table when passed empty array', () => {
        const { queryByTestId } = render(<ImmiPatientsList all_users={[]} />)
        const tableBody = queryByTestId('immi-all-users-table-body');
        const tableRow = queryByTestId('immi-all-users-table-row');
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
        const { queryByTestId } = render(<MemoryRouter><ImmiPatientsList all_users={all_users} /></MemoryRouter>)
        const tableBody = queryByTestId('immi-all-users-table-body');
        const tableRow = queryByTestId('immi-all-users-table-row');
        expect(tableBody).toContainElement(tableRow);
    });
});
