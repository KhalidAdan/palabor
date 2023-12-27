import CreateCreativeWorkForm from "../components/creative-work/create-creative-work-form";
import { Card, CardContent } from "../components/ui/card";
import { H1, Lead } from "../components/ui/typography";

export default function CreateCreativeWork() {
  return (
    <main className="w-full pt-20 grid place-items-center">
      <section className="max-w-xl">
        <H1 className="mb-6 text-center">Craft Your Vision</H1>
        <Lead className="text-center">
          Palabor is a platform for writing, reading, and sharing stories.
          Create a body of work to share vision!
        </Lead>
        <Card className="mt-6 pt-6">
          <CardContent>
            <CreateCreativeWorkForm />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
