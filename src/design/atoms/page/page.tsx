type Props = {
  children?: React.ReactNode;
  className?: string;
};
function Page({ children, className }: Props) {
  return (
    <section
      className={`pt-20 md:pt-0 overlay-home relative w-screen h-screen flex flex-col items-center justify-center md:justify-center ${className}`}
      style={{ pointerEvents: "none" }}
    >
      {children}
    </section>
  );
}
export default Page;
