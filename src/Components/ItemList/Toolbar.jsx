export default function Toolbar() {
  return (
    <div className="flex gap-3">
      <h4>To-dos list</h4>
      <svg
        className="h-6 w-6 flex-none fill-black stroke-white stroke-2 cursor-pointer"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" fill="none" />
        <line x1="8" y1="12" x2="16" y2="12" fill="none" />
      </svg>
      <div className="grow text-right">
        <select name="" id="" className="bg-white text-right">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not completed</option>
        </select>
      </div>
    </div>
  );
}
