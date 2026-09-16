import { motion } from 'framer-motion';

type Props = {
  items: string[];
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function StaggeredList({ items }: Props) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      style={{ listStyle: 'none', padding: 0 }}
    >
      {items.map((it, i) => (
        <motion.li key={i} variants={item} style={{ marginBottom: '0.5rem' }}>
          {it}
        </motion.li>
      ))}
    </motion.ul>
  );
}