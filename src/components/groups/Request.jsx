import { useState } from "react"

import add from "../../assets/icons/add-orange.png";
import Suggested from "./Suggested";

const Request = ({ allUsers, userData, setUserData, empty }) => {
    const [requestButton, setRequestButton] = useState(false);

    return (
        <>
            {requestButton ? (
                <Suggested allUsers={allUsers} userData={userData} setUserData={setUserData} handleClose={() => setRequestButton(prev => false)} />
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