import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Suggested = ({ allUsers, userData, setUserData, handleClose }) => {

    const getUpdatedConnectionList = () => {
        if ('relationships' in userData.data) {
            for (let i = 0; i <= userData.data.relationships.length - 1; i++) {
                allUsers = allUsers.filter((user => user.email !== userData.data.relationships[i].email));
            }
        }
    }
    
    const connect = async (e) => {
        e.preventDefault();
        const entry = {
            first_name: allUsers[e.target.value].first_name,
            group: allUsers[e.target.value].last_name,
            email: allUsers[e.target.value].email,
        }
        
        let relationships = [];
        
        if ('relationships' in userData.data) {
            relationships = [
                ...userData.data.relationships,
                entry
            ];
        } else {
            relationships = [entry];
        }
        
        setUserData(prev => ({
            ...prev,
            data: {
                relationships: relationships,
            },
        }));
        await updateDoc(doc(db, "users", userData.id), {relationships: relationships});
    }

    getUpdatedConnectionList();
    
    return (
        <>
            <div className="overlay" />
            <div className="request edit-request">
                <button onClick={handleClose} className="close">x</button>
                <div className="connection-box">
                    {allUsers.length === 0 ? <div className="no-connections">No connections available...</div> : allUsers.map((user, i) => {
                        return <div key={i} className="connect-row">
                            <span>{user.first_name} {user.last_name}</span>
                            <button onClick={connect} value={i} className="connect-button">Connect</button>
                        </div>;
                    })}
                </div>
            </div>
        </>
    );
}

export default Suggested