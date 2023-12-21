import { cssBundleHref } from "@remix-run/css-bundle";
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useFetchers,
  useLoaderData,
} from "@remix-run/react";
import mystyles from "./globals.css";
import { getTheme, setTheme, Theme } from "../lib/theme.server";

import { invariantResponse } from "@epic-web/invariant";
import { z } from "zod";
import { parse } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { Icons } from "../components/ui/icons";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: mystyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    theme: getTheme(request),
  });
}

const ThemeFormSchema = z.object({
  theme: z.enum(["light", "dark"]),
});

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  invariantResponse(
    formData.get("intent") === "update-theme",
    "Invalid intent",
    { status: 400 }
  );
  const submission = parse(formData, {
    schema: ThemeFormSchema,
  });
  if (submission.intent !== "submit") {
    return json({ status: "success", submission } as const);
  }
  if (!submission.value) {
    return json({ status: "error", submission } as const, { status: 400 });
  }
  const { theme } = submission.value;
  console.log("theme", theme);
  const responseInit = {
    headers: { "set-cookie": setTheme(theme) },
  };
  return json({ success: true, submission }, responseInit);
}

function useTheme() {
  const data = useLoaderData<typeof loader>();
  const fetchers = useFetchers();
  const themeFetcher = fetchers.find(
    (f) => f.formData?.get("intent") === "update-theme"
  );
  const theme = themeFetcher?.formData?.get("theme") as Theme;
  return theme ?? data.theme;
}

function ThemeSwitch({ userPreference }: { userPreference?: Theme }) {
  const fetcher = useFetcher<typeof action>();
  const [form] = useForm({
    id: "theme-switch",
    lastSubmission: fetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: ThemeFormSchema });
    },
  });
  const mode = userPreference ?? "light";
  const nextMode = mode === "light" ? "dark" : "light";
  const modeLabel = {
    light: (
      <Icons.sun>
        <span className="sr-only">Light</span>
      </Icons.sun>
    ),
    dark: (
      <Icons.moon>
        <span className="sr-only">Dark</span>
      </Icons.moon>
    ),
  };

  return (
    <fetcher.Form method="POST" {...form.props}>
      <input type="hidden" name="theme" value={nextMode} />
      <div className="flex gap-2">
        <button
          name="intent"
          value="update-theme"
          type="submit"
          className="flex h-8 w-8 cursor-pointer items-center justify-center"
        >
          {modeLabel[mode]}
        </button>
      </div>
    </fetcher.Form>
  );
}

export default function App() {
  const theme = useTheme();
  return (
    <html lang="en" className={`${theme} h-full`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <div className="absolute top-6 right-6">
          <ThemeSwitch userPreference={theme} />
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
