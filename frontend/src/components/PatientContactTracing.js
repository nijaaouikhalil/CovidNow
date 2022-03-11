import { useState } from "react";
import { Table } from "react-bootstrap";

export const PatientContactTracing = () => {

    const [currentTab, setCurrentTab] = useState("Submit");
    return (
        <div id="dd-main-container">
            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div>
                    <p className="text-center"><strong>Contact Tracing allows us to prevent the spreading of Covid-19.</strong><br/> Please submit the information of persons whom you have been in contact with recently. We will contact these people to inform them of the potential risk.<br/> Please note your credentials will be kept anonymous at all times.</p>
                </div>
                <ul className="nav nav-pills justify-content-center">
                    <li className="nav-item mx-3 pointer">
                    <a className={currentTab==="Submit" ? "nav-link active" : "nav-link"} 
                        onClick={() => setCurrentTab("Submit")}
                    >Submit Tracing Data</a>
                    </li>
                    <li className="nav-item pointer">
                        <a className={currentTab==="Submitted" ? "nav-link active" : "nav-link"} 
                            onClick={() => setCurrentTab("Submitted")}
                        >Previously Submitted Data</a>
                    </li>
                </ul>
                {currentTab === "Submit" && <SubmitTracingData />}
                {currentTab === "Submitted" &&  <PreviouslySubmittedTracingData />}
            </div>
        </div>
    )
};

const SubmitTracingData = () => {

    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');

    const addToList = (e) => {
        e.preventDefault();
        setData([...data, {name, lname, email}]);
        setName('');
        setLname('');
        setEmail('');
    }

    return (<>
        <div className="d-flex justify-content-center mt-4">
            <form className="col-lg-6 col-10 mt-2" onSubmit={addToList}>
                <h4>Add person to contact tracing data list</h4>
                <label className="form-label" htmlFor="">First Name</label>
                <input className="form-control" placeholder="First Name" type="text" onChange={(e) => setName(e.target.value)} value={name}/>
                <label className="form-label mt-2" htmlFor="">Last Name</label>
                <input className="form-control" placeholder="Last Name" type="text" onChange={(e) => setLname(e.target.value)} value={lname}/>
                <label className="form-label mt-2" htmlFor="">Email</label>
                <input className="form-control" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                <div className="d-flex justify-content-center mt-3">
                    <button 
                    className="btn btn-primary form-control w-50"
                    type="submit"
                    >Add</button>
                </div>
                
            </form>
        </div>

        <div className="d-flex align-items-center flex-column mt-3" >
            
            <div className="col-8" >

            <h5 className="my-5 text-center">When finished adding to list, please check below and click Submit All</h5>
            <h4 className="align-self-start">Current List</h4>
                <Table striped bordered hover variant="light" size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data && data.length > 0
                        ? data.map((user, index) => (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user ? user.name : "John"}</td>
                            <td>{user ? user.lname : "Doe"}</td>
                            <td>{user ? user.email : "John@Doe.com"}</td>
                            </tr>
                        ))
                        : ""}
                    </tbody>
                </Table>
            </div>

            <button className="btn btn-success form-control w-25">Submit All</button>

        </div>



        </>
    );
}

const PreviouslySubmittedTracingData = ({data}) => {

    return (
        <div className="d-flex align-items-center flex-column mt-3" >
            <div className="col-8" >
                <h4 className="my-2">Previously submitted data</h4>
                <Table striped bordered hover variant="light" size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data && data.length > 0
                        ? data.map((user, index) => (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user ? user.name : "John"}</td>
                            <td>{user ? user.lname : "Doe"}</td>
                            <td>{user ? user.email : "John@Doe.com"}</td>
                            </tr>
                        ))
                        : ""}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}