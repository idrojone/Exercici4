import CategoryCard from './CategoriaCard';

export default function CategoryList({ categories, lang }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {categories.map(c => (
        <CategoryCard key={c.id ?? c.name ?? c} category={c.name ?? c} lang={lang} />
      ))}
    </ul>
  )
}