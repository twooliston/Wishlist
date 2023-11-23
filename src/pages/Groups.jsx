import React, { useEffect, useState } from 'react';
import {motion} from "framer-motion";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';

import Layout from "../components/Layout";
import AuthenticationComponent from "../components/auth/AuthenticationComponent";

import Request from '../components/groups/Request';
import Group from '../components/groups/Group';

import unavailable from "../assets/icons/unavailable.png";

import "../styles/groups.scss";
import "../styles/tickbox.scss";

function Groups() {
    const [userData, setUserData] = useState(null);
    const [groupData, setGroupData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [groupWishlistData, setGroupWishlistData] = useState(null);
    const [groupWishlistLoading, setGroupWishlistLoading] = useState(false);
    
    const getGroups = (data) => {
        if ('relationships' in data) {
            let groups = {};
            for (let i = 0; i < data.relationships.length; i++) {
                if (!(data.relationships[i].group in groups)) {
                    groups = {
                        ...groups,
                        [data.relationships[i].group]: [{
                            index: i,
                            name: data.relationships[i].name,
                            email: data.relationships[i].email,
                        }]
                    }
                } else {
                    groups[data.relationships[i].group].push({
                        index: i,
                        name: data.relationships[i].name,
                        email: data.relationships[i].email,
                    })
                }
            }
            setGroupData(prev => groups);
        } else {
            setGroupData([]);
        }
    }
    const getGroupWishlist = async (e, email) => {
        let checker = true;
        setGroupWishlistLoading(prev => true);
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          if (email === doc.data().email) {
            if ('wishlist' in doc.data()) {
                setGroupWishlistData(prev => ({id: doc.id, wishlist: doc.data().wishlist, name: doc.data().name}));
            } else {
                setGroupWishlistData(prev => "no wishlist");
            }
            setGroupWishlistLoading(prev => false);
            checker = false;
          }
        });
        if (checker) {
            setGroupWishlistData(prev => "no account");
            setGroupWishlistLoading(prev => false);
        }
      }

    useEffect(() => {
        const getCollection = async (email) => {
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
              if (email === doc.data().email) {
                setUserData(prev => ({id: doc.id, data: doc.data()}));
                getGroups(doc.data());
                setLoading(prev => false);
              }
            });
          }
  
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                getCollection(user.email);
            }
        });
    
        return () => {
            listen();
        };
    }, []);

    return (
        <Layout>
            <AuthenticationComponent>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.25, ease: "easeOut"}}
                    exit={{opacity: 0}}
                >
                    {loading ? <>Loading your groups...</> : (
                        <>
                            <Request userData={userData}/>
                            {Object.keys(groupData).length > 0 ? (
                                <div className='groups'>
                                    {Object.keys(groupData).map((group, i) => {
                                        return <Group key={i} group={group} groupData={groupData[group]} getWishlist={getGroupWishlist}/>
                                    })}
                                </div>
                            ) : (
                                <>You do not have any groups</>
                            )}
                            {groupWishlistLoading ? <>Loading wishlist...</> : (
                                <>
                                    {groupWishlistData === null ? (
                                        <>Select a person to see their wishlist!</>
                                    ) : groupWishlistData === "no account" ? (
                                        <>No account linked to this person</>
                                    ) : groupWishlistData === "no wishlist" ? (
                                        <>This account has no wishlist</>
                                    ) : (
                                        <>
                                            <h1>{groupWishlistData.name}'s Wishlist</h1>
                                            <div className="outside-view">
                                                <div className="wishlist-table">
                                                    {groupWishlistData.wishlist.map((wish, i) => {
                                                        return <div className="wish-row" key={i}>
                                                            <div className="wish">
                                                                <span className="wish-index">{i + 1}</span>
                                                                <span className="vertical-separator"></span>
                                                                <span className="wish-name">{wish.name}</span>
                                                                <span className="vertical-separator"></span>
                                                                <span className="wish-price">£{wish.price}</span>
                                                            </div>
                                                            {wish.link === "" ? (
                                                                <div className="wish-extra wish-link"><img src={unavailable} alt="no link"/></div>
                                                            ) : (
                                                                <Link to={wish.link} className="wish-extra wish-link wish-link-available" target="_blank" rel="noopener noreferrer">link</Link>
                                                            )}
                                                        </div>
                                                    })}
                                                </div>
                                                <div className="wishlist-table remove-choice">
                                                    {groupWishlistData.wishlist.map((wish, i) => {
                                                        return <div className="wish-row" key={i}>
                                                            <div className='wish-extra select-wish'>
                                                                <input type="checkbox" id="buy" name={i}/>
                                                                <label for="buy">Remove choice for others</label>
                                                            </div>
                                                        </div>
                                                    })}

                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}

                </motion.div>
            </AuthenticationComponent>
        </Layout>
    );
}

// user={auth.currentUser.email}

export default Groups;