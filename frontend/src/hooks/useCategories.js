import { useEffect, useState } from 'react';
import { getCategories } from '../services/categories.service';


export default function useCategories(lang) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setCategories([]);
        setLoading(true);
        const data = await getCategories(lang);
        setCategories(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [lang]);

  return { categories, loading, error };
}