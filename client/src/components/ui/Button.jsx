export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-primary text-white rounded-2xl shadow-xl hover:scale-105 transition-all"
    >
      {children}
    </button>
  );
}