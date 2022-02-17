import { Table } from 'react-bootstrap'

const ImmiPatientsList = () => {
    return (
        <div id='dd-main-container'>
            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className='row justify-content-center mt-5'>
                    <div className="col-11">
                        <Table striped bordered hover variant="light" size="sm">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th className='dd-patient-email'>Email</th>
                                <th>Confirmed</th>
                                <th>Quarantined</th>
                                <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td className='dd-patient-email'>Mark@Otto.com</td>
                                <td>True</td>
                                <td>True</td>
                                <td><a href="/immi/patientdetails/132">More</a></td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td className='dd-patient-email'>Jacob@Thornton.com</td>
                                <td>False</td>
                                <td>False</td>
                                <td><a href="/immi/patientdetails/12">More</a></td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td>Dave</td>
                                <td>Bull</td>
                                <td className='dd-patient-email'>dave@bull.com</td>
                                <td>True</td>
                                <td>True</td>
                                <td><a href="/immi/patientdetails/4">More</a></td>
                                </tr>
                                <tr>
                                <td>4</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td className='dd-patient-email'>Mark@Otto.com</td>
                                <td>True</td>
                                <td>True</td>
                                <td><a href="/immi/patientdetails/132">More</a></td>
                                </tr>
                                <tr>
                                <td>5</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td className='dd-patient-email'>Jacob@Thornton.com</td>
                                <td>False</td>
                                <td>False</td>
                                <td><a href="/immi/patientdetails/12">More</a></td>
                                </tr>
                                <tr>
                                <td>6</td>
                                <td>Dave</td>
                                <td>Bull</td>
                                <td className='dd-patient-email'>dave@bull.com</td>
                                <td>True</td>
                                <td>True</td>
                                <td><a href="/immi/patientdetails/4">More</a></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )

};

export { ImmiPatientsList };