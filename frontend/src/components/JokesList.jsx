export default function JokesList({ jokes }) {
  return (
    <ul className="space-y-2 p-4">
      {jokes.map((j, i) => (
        <li key={j.id ?? i} className="p-3 bg-blue-100 border-l-4 border-blue-500 rounded text-gray-800">
          {j.content ?? j.value ?? j}
        </li>
      ))}
    </ul>
  );
}