import LoginForm from "../../components/forms/loginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="LoginPageBackGorund">
      <div className="LoginPage">
        <LoginForm />
      </div>
    </div>
  );
};
export async function loader() {
  localStorage.clear()
  return null;
}

export default LoginPage;
