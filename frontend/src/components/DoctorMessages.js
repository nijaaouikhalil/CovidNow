import { useEffect, useState } from "react";

export const DoctorMessages = ({patients}) => {
    return (
        <div id="dd-main-container">
            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <Inbox patients={patients}/>
            </div>
        </div>
    )
};

const Inbox = ({patients}) => {

    const [currentChat, setCurrentChat] = useState(patients[0] || null);

    const setChat = (pid) => {
        for (let i in patients){
            if (patients[i]._id == pid) {
                setCurrentChat(patients[i]);
                return;
            }
        };
    }

    return (
            <div id="doctor-inbox-cont" className="d-flex">
                <div className="col-3 mt-3">
                    {patients && patients.length>0 && patients.map(patient=> (
                    <button onClick={(e) => {setChat(e.target.value)}} value={patient._id} key={patient._id} className="pointer btn btn-primary">{patient.name +" "+ patient.lname}</button>
                    ))}
                </div>

                <div className="col-8">
                    <InboxItem patient={currentChat}/>
                </div>
                
            </div>
        
    )

}


const InboxItem = ({patient}) => {

    const [newMessage, setNewMessage] = useState('');
    const messages = [
        { from: 'doctor', message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", date: "10/03/2022", time: '13:10'},
        { from: 'patient', message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", date: "10/03/2022", time: '13:25'},
        { from: 'doctor', message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", date: "10/03/2022", time: '17:15'},
        { from: 'patient', message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", date: "11/03/2022", time: '09:20'}
    ];
    const sendMessage = () => {
    }

    return ( <>
        {patient &&
    <div className="row justify-content-center mt-3">
        <div className="col-9">
            <h5 className="ms-3">{patient.name}</h5>
            <div className="accordion-item acc-rounded-corners">
                <div className="accordion-body">
                    <ul className="messageList">

                        {messages && messages.length && messages.map((message, i)=> (                            
                            <li key={`msg${i}`} className={message.from == 'doctor' ?"recievedMessage" : "sentMessage"}>
                                <small>{message.from == 'doctor' ? "Doctor" : "Me"}</small>
                                {message.message}
                            </li>
                        ))}

                    </ul>

                    <div className="d-flex">
                        <input className="form-control mx-2" placeholder="Enter message" type="text" onChange={(e)=>setNewMessage(e.target.value)}/>
                        <button className="btn btn-success" onClick={sendMessage}><i className="fas fa-paper-plane"></i></button>
                    </div>

                    {/* <div className="d-flex flex-wrap mt-3 align-items-center">
                        <h5 className="w-100 ms-3">Set message as: </h5>
                        <div className="col-6 text-center">
                            <label className="mx-3">Urgent</label>
                            <input type="checkbox" name="Urgent" onChange={(e)=> setIsUrgent(!isUrgent)} />
                        </div>
                        <div className="col-6 text-center">
                            <label className="mx-3">Emergency</label>
                            <input type="checkbox" name="Emergency" onChange={(e)=> setIsEmergency(!isEmergency)}/>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    </div> }</>
    )
}

