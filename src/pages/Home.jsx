import React from 'react';
import {motion} from "framer-motion";

import Layout from "../components/Layout";
import AuthenticationComponent from "../components/auth/AuthenticationComponent";

import Wishlist from '../components/Wishlist';

function Home() {
    return (
        <Layout>
            <AuthenticationComponent>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.25, ease: "easeOut"}}
                    exit={{opacity: 0}}
                >
                    <Wishlist />
                </motion.div>
            </AuthenticationComponent>
        </Layout>
    );
}

// user={auth.currentUser.email}

export default Home;