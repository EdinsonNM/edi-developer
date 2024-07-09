type Props = {
  children?: React.ReactNode;
};
function Description({ children }: Props) {
  return (
    <p className="text-sm md:text-xl desc text-cyan-500 text-center md:text-left mt-8 hidden md:block">
      {children}
    </p>
  );
}
export default Description;
