function Button({ children, ...props }) {
  return (
    <button
      className="bg-amber-600 text-white py-2 px-6 rounded-xs hover:bg-amber-700 transition-all font-semibold cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;