const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm">
      <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );
};

export default Loading;
