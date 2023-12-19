import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign up Page" },
    { name: "description", content: "Sign up" },
  ];
};

export default function Register() {
  return (
    <div>
      <h1>Register Page</h1>
    </div>
  );
}
