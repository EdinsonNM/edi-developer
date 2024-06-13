type Props = {
  children?: React.ReactNode;
};
function Subtitle({ children }: Props) {
  return <h2 className="text-2xl md:text-3xl italic">{children}</h2>;
}
export default Subtitle;
