type Props = {
  children?: React.ReactNode;
};
function Title({ children }: Props) {
  return (
    <h1 className=" text-4xl md:text-5xl font-bold text-white mt-20 leading-snug">
      {children}
    </h1>
  );
}
export default Title;
