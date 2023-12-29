import { useState } from "react"
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import EditMember from "./EditMember";

import slash from "../../assets/icons/slash-white.png";
import pencil from "../../assets/icons/pencil-white.png";

const Group = ({ person }) => {
    const [editForm, setEditForm] = useState(name);

    const handleEdit = (e) => {
      setEditForm(prev => ({
        [e.target.name]: e.target.value,
      }))
    }

    return (
        <form onSubmit={editGroup}>
            <input onChange={handleEdit} placeholder="enter the name" defaultValue={name}/>
        </form>
    )
}

export default Group