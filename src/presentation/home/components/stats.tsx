function Stats() {
  const items = [
    { title: "Proyectos desarrollados", value: "+300" },
    { title: "Desarrolladores capacitados", value: "+60" },
    { title: "Años de experiencia", value: "+14" },
    { title: "Talleres brindados", value: "+15" },
  ];
  return (
    <div className="flex flex-row gap-2 md:gap-10 mt-6 flex-wrap items-center justify-center md:justify-end">
      {items.map((item) => (
        <div key={item.title}>
          <h3 className="text-sm text-orange-500 w-28 text-center mb-3">
            {item.title}
          </h3>
          <p className="text-3xl md:text-5xl text-center">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
export default Stats;
