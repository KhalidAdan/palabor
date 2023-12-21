import type { MetaFunction } from "@remix-run/node";
import { NavLink } from "@remix-run/react";
import { H1 } from "../../../components/ui/typography";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="container mx-auto">
      <header className="flex justify-center">
        <nav>
          <ul className="flex gap-4 mb-4">
            <li>
              <NavLink to="/" className="px-3 py-2 rounded-md bg-secondary">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/creative-works">Works</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <main className="h-full grid flex-col place-content-center">
          <H1>Palabor: A paradigm shift in creative publishing</H1>
        </main>
      </main>
    </div>
  );
}
