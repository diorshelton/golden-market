import { APP_NAME } from "../../constants";
import styles from "./Footer.module.css";

const Footer = () => (
	<footer className={styles.footer}>
		<span className={styles.wordmark}>{APP_NAME}</span>
		<span className={styles.copyright}>© 2026 · All rights reserved</span>
	</footer>
);

export default Footer;
