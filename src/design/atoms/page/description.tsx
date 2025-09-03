type Props = {
  children?: React.ReactNode;
};
function Description({ children }: Props) {
  return (
    <p className="text-sm md:text-xl desc text-foreground text-center md:text-left mt-8 hidden md:block shadow-2xl">
      {children}
    </p>
  );
}
export default Description;
