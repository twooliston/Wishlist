import { useState } from "react"

import EditMember from "./EditMember";

import add from "../../assets/icons/add-orange.png";

const Request = ({ userData, setUserData, empty }) => {
    const [requestButton, setRequestButton] = useState(false);

    return (
        <>
            {requestButton ? (
                <EditMember userData={userData} setUserData={setUserData} formData={{name: "", email: "", group: ""}} group={null} handleClose={() => setRequestButton(prev => false)} />
            ) : (
                <>
                    { empty ? (
                        <button onClick={() => setRequestButton(true)} className="open">Add Person</button>
                    ) : (
                        <button onClick={() => setRequestButton(true)} className="btn-no-style"><img src={add} alt="add"/></button>
                    )}
                </>
            )}
        </>
    );
}

export default Request