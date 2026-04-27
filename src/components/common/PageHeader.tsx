import styles from "./PageHeader.module.css";

interface Props {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: Props) => (
  <div className={styles.header}>
    <h1 className={styles.title}>{title}</h1>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
  </div>
);

export default PageHeader;
