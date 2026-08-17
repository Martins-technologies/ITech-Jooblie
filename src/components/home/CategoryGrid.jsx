import CategoryCard from './CategoryCard.jsx';

const columnClasses = {
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-6',
};

export default function CategoryGrid({ items, columns = 5 }) {
  return (
    <div className={`grid gap-2.5 ${columnClasses[columns] || columnClasses[5]}`}>
      {items.map((item) => (
        <CategoryCard key={item.id} {...item} />
      ))}
    </div>
  );
}
