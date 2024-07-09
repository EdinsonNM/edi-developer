type Props = {
  children?: React.ReactNode;
  align?: "justify-start" | "justify-center" | "justify-end";
};
function Container({ children, align = "justify-center" }: Props) {
  return (
    <div
      className={`title w-full max-w-[1024px] p-8 md:p-5 flex flex-col md:flex-col items-center md:items-start ${align} text-start gap-4`}
    >
      {children}
    </div>
  );
}
export default Container;
