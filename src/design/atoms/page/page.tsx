type Props = {
  children?: React.ReactNode;
};
function Page({ children }: Props) {
  return (
    <section
      className="pt-20 md:pt-0 overlay-home relative w-screen h-screen flex flex-col items-center justify-center md:justify-center overflow-hidden"
      style={{ pointerEvents: "all" }}
    >
      {children}
    </section>
  );
}
export default Page;
