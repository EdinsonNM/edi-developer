import "./app.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "@presentation/utils/use-i18n";
import AppRouter from "./app.routes";

// Crear QueryClient fuera del componente para evitar recrearlo en cada render
// O usar useState para mantener la misma instancia
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minuto
      gcTime: 5 * 60 * 1000, // 5 minutos (antes cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <AppRouter />
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
