import styles from "./CategoryFilter.module.css";

interface CategoryFilterProps {
	categories: string[];
	selectedCategory: string;
	onSelect: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onSelect }: CategoryFilterProps) => (
	<div className={styles.wrapper}>
		{categories.map((category) => (
			<button
				key={category}
				onClick={() => onSelect(category)}
				className={
					selectedCategory === category
						? `${styles.button} ${styles.buttonActive}`
						: styles.button
				}
			>
				{category}
			</button>
		))}
	</div>
);

export default CategoryFilter;
