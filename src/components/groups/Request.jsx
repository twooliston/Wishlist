import { useState } from "react"
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Request = ({ userData }) => {
    const [requestButton, setRequestButton] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        group: "",
    });

    const handleChange = (e) => {
        setForm(prev => ({
            ...form,
            [e.target.name]: e.target.value,
          }));
    }

    const addEmail = async (e) => {
        e.preventDefault();
        let relationships = []
        if ('relationships' in userData.data) {
            relationships = [
                ...userData.data.relationships,
                form
            ];
        } else {
            relationships = [form];
        }
        await updateDoc(doc(db, "users", userData.id), {relationships: relationships});
    }

    return (
        <div className="request">
            {requestButton ? (
                <>
                    <form onSubmit={addEmail}>
                        <input onChange={handleChange} placeholder="add their name" name="name" type="name" required/>
                        <input onChange={handleChange} placeholder="add their email" name="email" type="email" required/>
                        <input onChange={handleChange} placeholder="add a group name" name="group" type="name" required/>
                        <button type="submit" name="addEmail">Add</button>
                    </form>
                    <button onClick={() => setRequestButton(false)}>Close</button>
                </>
            ) : (
                <button onClick={() => setRequestButton(true)}>
                    Add Person
                </button>
            )}
        </div>
    )
}

export default Request