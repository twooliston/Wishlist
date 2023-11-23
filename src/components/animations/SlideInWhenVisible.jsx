import {motion} from "framer-motion";

function SlideInWhenVisible({ children, index = 1, childClass = "" }) {
    return (
      <motion.div
        initial={{
            opacity: 0,
            x: 100,
        }}
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.15 * index }}
        variants={{
          visible: { opacity: 1, x: 0 },
          hidden: { opacity: 0, x: 0 }
        }}
        className={childClass}
      >
        {children}
      </motion.div>
    );
  }

  export default SlideInWhenVisible;