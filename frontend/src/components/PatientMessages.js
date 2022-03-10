import { useEffect, useState } from "react";

export const PatientMessages = () => {

    return (
        <div id="dd-main-container">
            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <Inbox />
            </div>
        </div>
    )
};



const Inbox = () => {

    const [newMessage, setNewMessage] = useState('');
    const [isEmergency, setIsEmergency] = useState(false);
    const [isUrgent, setIsUrgent] = useState(false);
    const messages = [
        { from: 'doctor', message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", date: "10/03/2022", time: '13:10'},
        { from: 'patient', message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", date: "10/03/2022", time: '13:25'},
        { from: 'doctor', message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", date: "10/03/2022", time: '17:15'},
        { from: 'patient', message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", date: "11/03/2022", time: '09:20'}
    ];
    const sendMessage = () => {
    }

    useEffect(()=> {
        console.log("emergency: ", isEmergency, "Urgent: ", isUrgent)
    }, [isEmergency, isUrgent])

    return (
    <div className="row justify-content-center mt-5">
        <div className="col-9">
            <div className="accordion">
                <div className="accordion-item">
                    <div className="show">
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

                            <div className="d-flex flex-wrap mt-3 align-items-center">
                                <h5 className="w-100 ms-3">Set message as: </h5>
                                <div className="col-6 text-center">
                                    <label className="mx-3">Urgent</label>
                                    <input type="checkbox" name="Urgent" onChange={(e)=> setIsUrgent(!isUrgent)} />
                                </div>
                                <div className="col-6 text-center">
                                    <label className="mx-3">Emergency</label>
                                    <input type="checkbox" name="Emergency" onChange={(e)=> setIsEmergency(!isEmergency)}/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}




