import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DoctorAppointment = ({patients}) => {

    const [currentTab, setCurrentTab] = useState("Scheduled");

    return (
        <div id="dd-main-container">
            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <ul className="nav nav-pills justify-content-center">
                    <li className="nav-item pointer">
                        <a className={currentTab==="Scheduled" ? "nav-link active" : "nav-link"} 
                            onClick={() => setCurrentTab("Scheduled")}
                        >Scheduled Appointments</a>
                    </li>
                    <li className="nav-item mx-3 pointer">
                    <a className={currentTab==="New Appointment" ? "nav-link active" : "nav-link"} 
                        onClick={() => setCurrentTab("New Appointment")}
                    >New Appointment</a>
                    </li>
                </ul>
                {currentTab === "New Appointment" && <NewAppointment patients={patients} />}
                {currentTab === "Scheduled" && (
                    <h4>Scheduled</h4>
                )}
            </div>
        </div>
    )
};


const NewAppointment = ({patients}) => {

    const [startDate, setStartDate] = useState(new Date().setHours(new Date().getHours(), 0));
    const [patient, setPatient] = useState(null);
    const [nameInput, setNameInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const minStartTime = new Date().setHours(8, 0);
    const maxEndTime = new Date().setHours(20, 1)

    const buildSearchResults = (e) => {
        setPatient(null);
        setNameInput(e.target.value);
        let userInput = e.target.value.toLowerCase();
        let results = [];
        if (userInput.length === 0) results = patients;
        else {
            for (let i in patients){
                let patientFullName = `${patients[i].name} ${patients[i].lname}`.toLowerCase();
                if (userInput === patientFullName.substring(0, userInput.length)){
                    results.push(patients[i]);
                }
            }
        }
        setSearchResults(results);
    }

    const handleClick = (pat) => {
        setPatient(pat);
        setSearchResults(null);
    };

    const clearValues = () => {
        setPatient(null);
        setSearchResults(patients);
        setNameInput('');
        setStartDate(new Date().setHours(new Date().getHours(), 0));
    };

    useEffect(()=> {
        setSearchResults(patients);
    }, []);

    return (
        <>
        <h4 className="mt-3 ms-3">New Appointment</h4>

        <div className="row d-flex flex-wrap justify-content-center">

            <div className="d-flex mt-3 col-md-5 col-8 flex-column justify-content-between align-items-center mx-4">
                <h5 className="my-3">Select Patient</h5>

                <div className="d-flex jusify-content-between align-items-center">
                    <div id="appointmentPatientDropdown" className="dropdown mx-4">
                        <input onInput={buildSearchResults} placeholder={'Enter patient name'} className="btn btn-primary btn-sm p-2 dropdown-toggle" type="text" data-bs-toggle="dropdown" value={patient ?  `${patient.name} ${patient.lname}`: nameInput} />
                        <ul className="dropdown-menu">
                            {searchResults && searchResults.map(pat => (
                                <li key={'li-'+pat.email+Math.floor(Math.random() * 10000)}>
                                    <a key={pat.email+'-a'+Math.floor(Math.random() * 10000)} 
                                    className="dropdown-item"
                                    onClick={()=> handleClick(pat)}
                                    >{pat.name} {pat.lname}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                          
                </div>
                
            </div>

            <div className="d-flex mt-3 mx-4 col-md-5 col-8 flex-column justify-content-center align-items-center">
                <h5 className="my-3">Select Date &amp; time</h5>
                <div>
                    <DatePicker 
                    showTimeSelect 
                    minDate={new Date()}
                    minTime={minStartTime}
                    maxTime={maxEndTime}
                    dateFormat="MMMM d, yyyy - h:mm aa"
                    className="btn btn-primary btn-sm pointer text-center p-2"
                    id="doctorDatePicker"
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)}
                />
                </div>
            </div>


            <div className="col-8 mt-5 d-flex justify-content-evenly">
                <div className="d-flex w-75 justify-content-center align-items-center">
                    <button className='btn btn-success w-75 mx-2'>Schedule</button>
                    <button onClick={clearValues} className='btn btn-danger w-50 mx-2'>Clear</button>
                </div>
            </div>

        </div>
        </>
        
    )
}