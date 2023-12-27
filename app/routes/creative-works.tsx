import { H1, Lead } from "../components/ui/typography";
import SelectCreativeWork from "../components/creative-work/select-creative-work";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "View your work" }];
};

export default function CreativeWorks() {
  return (
    <main className="container mx-auto max-w-3xl pt-20">
      <H1 tabIndex={-1}>Select a creative work</H1>
      <Lead className="mb-10" tabIndex={-1}>
        Choose a body of work below to continue where you left off or create a
        new one.
      </Lead>

      <SelectCreativeWork works={[]} />
    </main>
  );
}
