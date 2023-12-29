import { useState } from "react"
import EditMember from "./EditMember";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import slash from "../../assets/icons/slash-white.png";
import pencil from "../../assets/icons/pencil-white.png";
import remove from "../../assets/icons/delete-white.png";

const Group = ({ userData, setUserData, group, groupData, getWishlist }) => {
    const [edit, setEdit] = useState(false);
    const [editMember, setEditMember] = useState(null);
    // const [editGroupName, setEditGroupName] = useState(group);

    const setForm = () => {
        setEdit(true);
    }

    const handleEdit = (e, i) => {
        e.preventDefault();
        setEditMember(prev => i);
    }

    const handleClose = () => {
        setEditMember(prev => null);
    }

    const deleteMember = async (e, index) => {
        e.preventDefault();
        let relationships = [...userData.data.relationships]
        relationships.splice(index, 1);
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
        {edit ? (
            <div className="group">
                <h2 className="group-name">
                    <div>{group}</div>
                    <button onClick={() => setEdit(false)}><img src={pencil} alt="edit" /><img src={slash} className="slash" alt="edit" /></button>
                </h2>
                {groupData.map((person, i) => {
                    return (
                        <div className="person-edit" key={i}>
                            <div>{person.name}</div>
                            <div>
                                <button onClick={(e) => handleEdit(e, i)}><img src={pencil} alt="edit" /></button>
                                <button onClick={(e) => deleteMember(e, i)}><img src={remove} alt="delete" /></button>
                            </div>
                        </div>
                    );
                })}
                {editMember === null ? "" : <EditMember userData={userData} setUserData={setUserData} formData={groupData[editMember]} group={group} handleClose={handleClose} />}
            </div>
        ) : (
            <div className="group">
                <h2 className="group-name">
                    <div>{group}</div>
                    <button onClick={setForm}><img src={pencil} alt="edit" /></button>
                </h2>
                {groupData.map((person, i) => {
                    return <button key={i} onClick={(e) => getWishlist(e, person.email)}>{person.name}</button>
                })}
            </div>
        )}
        </>
    )
}

export default Group