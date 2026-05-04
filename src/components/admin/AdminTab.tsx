import React from 'react';
import { motion } from 'motion/react';

interface AdminTabProps {
  children: React.ReactNode;
  id: string;
}

export const AdminTab: React.FC<AdminTabProps> = ({ children, id }) => {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};
