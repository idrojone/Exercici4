import { Link } from 'react-router-dom';

export default function CategoryCard({ category, lang }) {
  return (
    <li>
      <Link to={`/jokes/${encodeURIComponent(category)}/${lang}`}>
        {category}
      </Link>
    </li>
  );
}