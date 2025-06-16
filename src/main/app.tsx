import AppRouter from "./app.routes";
import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "@presentation/utils/use-i18n";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <AppRouter />
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
