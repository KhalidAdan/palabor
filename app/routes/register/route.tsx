import { MetaFunction } from "@remix-run/node";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Form } from "@remix-run/react";
import { useId } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Register Page" },
    { name: "description", content: "Register" },
  ];
};

export default function Register() {
  const formId = useId();
  return (
    <main className="grid place-items-center h-full">
      <div className="flex flex-col">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex justify-center mb-4">
              Create Account
            </CardTitle>
            <CardDescription className="flex justify-center mb-4">
              Choose an authentication provider below that you have an account
              with
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form id={formId}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Button
                    form={formId}
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      // do stuff
                    }}
                  >
                    Login with Google
                  </Button>
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
