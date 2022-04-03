import { render, cleanup } from '@testing-library/react';
import { AdminAllUsersList } from '../AdminAllUsersList';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'


describe("Table displaying all users in admin panel", () => {
    afterEach(cleanup);
    it('renders without crashing', () => {
        render(<AdminAllUsersList />);
    });
    
    it('renders empty table when passed empty array', () => {
        const { queryByTestId } = render(<AdminAllUsersList all_users={[]}/>)
        const table = queryByTestId('admin-all-users-table-body');
        expect(table).toBeNull();
    });
    
    it('renders rows in table when passed array of users', () => {
        let all_users = [
            {
                _id: "testId",
                name: 'testName',
                lname: 'testLName',
                email: 'test@email',
                count: 29,
                roles: {name:'admin'},
                covidStatus: 'negative',
                your_doctor: {name: "testDoctorName"}
            }
        ]
        const { queryByTestId } = render(<MemoryRouter><AdminAllUsersList all_users={all_users}/></MemoryRouter>)
        const table = queryByTestId('admin-all-users-table-body');
        const row = queryByTestId('admin-all-users-table-row');
        expect(table).toContainElement(row);
    });
});
