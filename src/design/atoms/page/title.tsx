type Props = {
  children?: React.ReactNode;
};
function Title({ children }: Props) {
  return (
    <h1 className="text-3xl md:text-5xl font-bold text-foreground mt-20 leading-snug text-center md:text-left">
      {children}
    </h1>
  );
}
export default Title;
