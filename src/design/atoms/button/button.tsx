type ButtonProps = {
  children: React.ReactNode;
};
function Button({ children }: ButtonProps) {
  return (
    <a className="text-center mt-2 block bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors pointer-events-all cursor-pointer">
      {children}
    </a>
  );
}
export default Button;
