import UserProvider from './UserProvider';
import ThemeProvider from './ThemeProvider';

function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </UserProvider>
  );
}

export default ContextProvider;
