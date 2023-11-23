import { useState } from "react"
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Group = ({ group, groupData, getWishlist }) => {
    return (
        <div className="group">
            <h2>{group}</h2>
            {groupData.map((person, i) => {
                return <button key={i} onClick={(e) => getWishlist(e, person.email)}>{person.name}</button>
            })}
        </div>
    )
}

export default Group