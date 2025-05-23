function Button({ children, ...props }) {
  return (
    <button
      className="bg-blue-200 py-2 px-6 rounded-xs hover:bg-blue-400 transition-all font-semibold cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;