type Props = {
  children?: React.ReactNode;
};
function Page({ children }: Props) {
  return (
    <section
      className="overlay-home relative w-screen h-screen flex flex-col items-center justify-start md:justify-center overflow-hidden"
      style={{ pointerEvents: "none" }}
    >
      {children}
    </section>
  );
}
export default Page;
