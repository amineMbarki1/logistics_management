export default function formatTime(date: Date) {
  const hours =
    `${date.getHours()}`.length > 1
      ? `${date.getHours()}`
      : `0${date.getHours()}`;
      
  const minutes =
    `${date.getMinutes()}`.length > 1
      ? `${date.getMinutes()}`
      : `0${date.getMinutes()}`;

  return `${hours}:${minutes}`;
}
