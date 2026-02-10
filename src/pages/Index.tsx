import { useAuth } from "@/hooks/useAuth";
import AuthPage from "@/components/AuthPage";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const { user, login, register, logout, loading, error } = useAuth();

  if (!user) {
    return (
      <AuthPage
        onLogin={login}
        onRegister={register}
        loading={loading}
        error={error}
      />
    );
  }

  return <Dashboard username={user.username} onLogout={logout} />;
};

export default Index;
