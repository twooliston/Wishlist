import { useState } from "react"
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import slash from "../../assets/icons/slash-white.png";
import pencil from "../../assets/icons/pencil-white.png";
import remove from "../../assets/icons/delete-white.png";

const Group = ({ userData, setUserData, group, groupData, getWishlist }) => {
    const [edit, setEdit] = useState(false);

    const deleteMember = async (e, index) => {
        e.preventDefault();
        let relationships = [...userData.data.relationships];
        relationships.splice(groupData[index].index, 1);
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
                            <div>{person.first_name}</div>
                            <div>
                                <button onClick={(e) => deleteMember(e, i)}><img src={remove} alt="delete" /></button>
                            </div>
                        </div>
                    );
                })}
            </div>
        ) : (
            <div className="group">
                <h2 className="group-name">
                    <div>{group}</div>
                    <button onClick={() => setEdit(true)}><img src={pencil} alt="edit" /></button>
                </h2>
                {groupData.map((person, i) => {
                    return <button key={i} onClick={(e) => getWishlist(e, person.email)}>{person.first_name}</button>
                })}
            </div>
        )}
        </>
    )
}

export default Group