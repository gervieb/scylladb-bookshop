import { ReactNode } from "react";
import Header from "components/Header";
import styles from "layouts/PageLayout/PageLayout.module.css";

interface IPageLayout {
  children: ReactNode;
}

const PageLayout = ({ children }: IPageLayout) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.pageContainer}>{children}</div>
    </div>
  );
};

export default PageLayout;
