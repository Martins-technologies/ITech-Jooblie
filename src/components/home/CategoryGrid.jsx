import CategoryCard from './CategoryCard.jsx';

/** Cards grow to fill the row and wrap before they get too narrow to show full text. */
const cardGridClass =
  'grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]';

export default function CategoryGrid({ items }) {
  return (
    <div className={cardGridClass}>
      {items.map((item) => (
        <CategoryCard key={item.id} {...item} />
      ))}
    </div>
  );
}
