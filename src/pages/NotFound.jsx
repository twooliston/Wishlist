import { Link } from "react-router-dom";
import {motion} from "framer-motion";

import Layout from "../components/Layout";

const NotFound = () => {
    return (
        <Layout>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.25, ease: "easeOut"}}
                exit={{opacity: 0}}
            >
                <div className='home'>
                    <div className='home-title'>
                        <h1>Page Not Found</h1>
                        <h2 className='under-heading'>
                            <div>Would you like to go back to the home page?</div>
                        </h2>
                        <div className="home-buttons">
                            <Link className='btn' to={"/"}>Home</Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Layout>
    );
  };
  
  export default NotFound;