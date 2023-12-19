import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Login Page" }, { name: "description", content: "Login" }];
};

export default function Login() {
  return (
    <div>
      <h1>Login Page</h1>
    </div>
  );
}
