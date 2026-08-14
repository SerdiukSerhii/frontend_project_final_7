import React from 'react';
import styles from './SectionTitle.module.css';

interface SectionTitleProps {
  title: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, className = '' }) => {
  return <h2 className={`${styles.title} ${className}`.trim()}>{title}</h2>;
};

export default SectionTitle;
