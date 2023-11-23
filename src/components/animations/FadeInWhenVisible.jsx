import {motion} from "framer-motion";

function FadeInWhenVisible({ children, index = 1, childClass = "" }) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.15 * index }}
        variants={{
          visible: { opacity: 1, scale: 1 },
          hidden: { opacity: 0, scale: 0.6 }
        }}
        className={childClass}
      >
        {children}
      </motion.div>
    );
  }

  export default FadeInWhenVisible;