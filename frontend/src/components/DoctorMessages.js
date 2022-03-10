import { useState } from "react";

export const DoctorMessages = ({patients}) => {

    const [currentTab, setCurrentTab] = useState("Inbox");

    return (
        <div id="dd-main-container">
            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <ul className="nav nav-pills justify-content-center">
                    <li className="nav-item pointer">
                        <a className={currentTab==="Inbox" ? "nav-link active" : "nav-link"} 
                            onClick={() => setCurrentTab("Inbox")}
                        >Inbox</a>
                    </li>
                    <li className="nav-item mx-3 pointer">
                    <a className={currentTab==="New Message" ? "nav-link active" : "nav-link"} 
                        onClick={() => setCurrentTab("New Message")}
                    >New Message</a>
                    </li>
                </ul>

                {currentTab === "Inbox" &&  <h3>Inbox</h3>}
                {currentTab === "New Message" &&  <h3>New message</h3>}
            </div>
        </div>
    )
};


