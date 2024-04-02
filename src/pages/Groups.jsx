import React, { useEffect, useState } from 'react';
import {motion} from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

import Layout from "../components/Layout";
import AuthenticationComponent from "../components/auth/AuthenticationComponent";

import Request from '../components/groups/Request';
import Group from '../components/groups/Group';
import PersonWishlist from '../components/groups/PersonWishlist';

import LoadingAnimation from '../components/modulettes/LoadingAnimation';

import "../styles/groups.scss";

function Groups() {
    const [userData, setUserData] = useState(null);
    const [groupData, setGroupData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [groupWishlistData, setGroupWishlistData] = useState(null);
    const [buyersData, setBuyersData] = useState(null)
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
                    setGroupWishlistData(prev => ({id: doc.id, data: doc.data()}));
                    setBuyersData(prev => {
                        return doc.data().wishlist.map((wish) => {
                            if ('buyer' in wish) {
                                if (wish.buyer === "" || wish.buyer === userData.data.email) {
                                    return false;
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        });
                    });
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

    const handleUpdate = (updatedData) => {
        let newData = {...userData};
        newData.data.relationships = updatedData().data.relationships;
        setUserData(prev => ({...newData}));
        getGroups(updatedData().data);
    }

    return (
        <Layout>
            <AuthenticationComponent>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.25, ease: "easeOut"}}
                    exit={{opacity: 0}}
                >
                    {loading ? <LoadingAnimation /> : (
                        <>
                            <div className='groups'>
                                {Object.keys(groupData).length > 0 ? (
                                    <>
                                        {Object.keys(groupData).map((group, i) => {
                                            return <Group key={i} userData={userData} setUserData={(updatedData) => handleUpdate(updatedData)} group={group} groupData={groupData[group]} getWishlist={getGroupWishlist}/>
                                        })}
                                        <Request userData={userData} setUserData={(updatedData) => handleUpdate(updatedData)} empty={false}/>
                                    </>
                                ) : (
                                    <div className='no-groups'>
                                        <>You do not have any groups</>
                                        <Request userData={userData} setUserData={(updatedData) => handleUpdate(updatedData)} empty={true}/>
                                    </div>
                                )}
                            </div>
                            {groupWishlistLoading ? <LoadingAnimation /> : (
                                <>
                                    {groupWishlistData === null ? (
                                        <>Select a person to see their wishlist!</>
                                    ) : groupWishlistData === "no account" ? (
                                        <>No account linked to this person</>
                                    ) : groupWishlistData === "no wishlist" ? (
                                        <>This account has no wishlist</>
                                    ) : (
                                        <PersonWishlist userEmail={userData.data.email} person={groupWishlistData} buyersData={buyersData} setGroupWishlistData={setGroupWishlistData}/>
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

export default Groups;