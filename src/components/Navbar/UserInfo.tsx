import styles from "./UserInfo.module.css";

interface UserInfoProps {
	username: string;
	coins: number;
}

const UserInfo = ({ coins }: UserInfoProps) => (
	<div className={styles.pill}>
		<div className={styles.dot} />
		{coins.toLocaleString()} coins
	</div>
);

export default UserInfo;
