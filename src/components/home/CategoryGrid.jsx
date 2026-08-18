import CategoryCard from './CategoryCard.jsx';

const columnClasses = {
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
  6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-6',
};

export default function CategoryGrid({ items, columns }) {
  const count = columns || items.length;
  const cols = columnClasses[count] || columnClasses[5];

  return (
    <div className={`grid gap-3 ${cols}`}>
      {items.map((item) => (
        <CategoryCard key={item.id} {...item} />
      ))}
    </div>
  );
}
