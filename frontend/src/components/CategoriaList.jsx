import CategoryCard from './CategoriaCard';

export default function CategoryList({ categories, lang }) {
  return (
    <ul>
      {categories.map(c => (
        <CategoryCard key={c.id ?? c.name ?? c} category={c.name ?? c} lang={lang} />
      ))}
    </ul>
  )
}