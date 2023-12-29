import { useState } from "react"
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const EditMember = ({ userData, setUserData, formData, group, handleClose }) => {
    const [form, setForm] = useState({
        name: formData.name,
        email: formData.email,
        group: group === null ? formData.group : group,
    });

    const handleChange = (e) => {
        setForm(prev => ({
            ...form,
            [e.target.name]: e.target.value,
          }));
    }

    const addEmail = async (e) => {
        e.preventDefault();
        let relationships = [];

        if (group === null) {
            if ('relationships' in userData.data) {
                relationships = [
                    ...userData.data.relationships,
                    form
                ];
            } else {
                relationships = [form];
            }
        } else {
            relationships = [...userData.data.relationships]
            relationships[formData.index] = form;
        }

        handleClose();
        setUserData(prev => ({
            ...prev,
            data: {
                relationships: relationships,
            },
        }));
        await updateDoc(doc(db, "users", userData.id), {relationships: relationships});
    }

    return (
        <>
            <div className="overlay" />
            <div className="request edit-request">
                <button onClick={handleClose} className="close">x</button>
                <form onSubmit={addEmail}>
                    <label>name</label>
                    <input onChange={handleChange} placeholder="add their name" name="name" type="name" defaultValue={form.name} required/>
                    <label>email</label>
                    <input onChange={handleChange} placeholder="add their email" name="email" type="email" defaultValue={form.email} required/>
                    <label>group name</label>
                    <input onChange={handleChange} placeholder="add a group name" name="group" type="name" defaultValue={form.group} required/>
                    <button type="submit" name="addEmail">Save</button>
                </form>
            </div>
        </>
    );
}

export default EditMember