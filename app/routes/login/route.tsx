import { MetaFunction } from "@remix-run/node";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export const meta: MetaFunction = () => {
  return [{ title: "Login Page" }, { name: "description", content: "Login" }];
};

export default function Login() {
  return (
    <main className="grid place-items-center h-full">
      <div className="flex flex-col">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex justify-center mb-4">
              Welcome Back
            </CardTitle>
            <CardDescription className="flex justify-center mb-4">
              Choose an authentication provider below that you have an account
              with
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      // do stuff
                    }}
                  >
                    Google
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
