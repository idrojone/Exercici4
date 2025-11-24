export default function JokesList({ jokes }) {
  return (
    <ul>
      {jokes.map((j, i) => (
        <li key={j.id ?? i}>{j.content ?? j.value ?? j}</li>
      ))}
    </ul>
  );
}