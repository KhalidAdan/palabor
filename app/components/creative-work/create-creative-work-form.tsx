"use client";

import { slugify } from "../../lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Form } from "@remix-run/react";

const CreateCreativeWorkForm = () => {
  const [slug, setSlug] = useState("");
  return (
    <Form
      // action={async (formData: FormData) => {
      //   confetti(async () => await createCreativeWork(formData));
      // }}
      className="space-y-4"
    >
      <div className="space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          onChange={(event) => setSlug(slugify(event.target.value))}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="slug">URL</Label>
        <Input name="slug" defaultValue={slug} />
        <p className="text-sm text-muted-foreground">
          The slug is the URL-friendly version of the name. It is usually all
          lowercase and contains only letters, numbers, and hyphens. If you do
          not set this, it will be automatically generated from the title.
        </p>
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" />
      </div>

      <Button type="submit">Create</Button>
    </Form>
  );
};

export default CreateCreativeWorkForm;
