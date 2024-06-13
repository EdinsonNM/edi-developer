type Props = {
  children?: React.ReactNode;
};
function Description({ children }: Props) {
  return (
    <p className="text-sm max-w-[600px] desc text-[#B5C8CC]">{children}</p>
  );
}
export default Description;
