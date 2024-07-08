type Props = {
  children?: React.ReactNode;
};
function Description({ children }: Props) {
  return <p className="text-xl desc text-[#B5C8CC]">{children}</p>;
}
export default Description;
