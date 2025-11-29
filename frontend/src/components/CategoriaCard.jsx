import { Link } from 'react-router-dom';

export default function CategoryCard({ id, category, lang }) {
  return (
    <li className="mb-2">
      <Link
        to={`/jokes/${encodeURIComponent(id)}/${lang}`}
        className="block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {category}
      </Link>
    </li>
  );
}