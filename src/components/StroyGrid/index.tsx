"use client";

import styles from "./styles.module.css";
import { FC } from "react";

export type StoryGridProps = {
  children?: React.ReactNode;
};

const StoryGrid: FC<StoryGridProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default StoryGrid;
