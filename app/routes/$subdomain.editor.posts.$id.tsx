import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sign up Page" },
    { name: "description", content: "Sign up" },
  ];
};

export default function Editor() {
  return (
    <div>
      <h1>Editor Page</h1>
      <p>add editor here</p>
    </div>
  );
}
