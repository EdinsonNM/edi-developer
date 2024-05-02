import classNames from "classnames";

function OverlayTechnology() {
  return (
    <section
      className={classNames("relative w-screen h-screen", {
        "text-center": true,
        "opacity-0": false,
        flex: true,
        "items-center": true,
        "justify-end": true,
        "backdrop-filter backdrop-blur": true,
      })}
    >
      <div
        className={`text-lg text-black h-full w-full rounded-lg px-4 py-40 bg-opacity-50`}
      >
        <div>Scroll down</div>
        <button style={{ pointerEvents: "all" }}>back</button>
      </div>
    </section>
  );
}
export default OverlayTechnology;
