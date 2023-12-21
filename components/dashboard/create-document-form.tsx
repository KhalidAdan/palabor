"use client";

import { slugify } from "../../lib/utils";
import { Work } from "@prisma/client";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Icons } from "../ui/icons";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Form } from "@remix-run/react";

export const CreateDocumentForm = ({ work }: { work: Work }) => {
  const [open, setOpen] = useState(false);
  const [slug, setSlug] = useState("");

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setSlug("");
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default">
          <Icons.add className="mr-2 h-4 w-4" /> New post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="mb-4">
          <DialogTitle>Create a new post.</DialogTitle>
          <DialogDescription>
            Create a post, then share it with the world!
          </DialogDescription>
        </DialogHeader>

        <Form
          className="space-y-4"
          // action={async (formData: FormData) => {
          //   await createDocument(formData, String(work.id));
          //   setOpen(false);
          // }}
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
            <p className="text-xs text-muted-foreground">
              This is the url that will be used to access your post by your
              readers, don&apos;t get too spicy!
            </p>
          </div>

          <Button type="submit">Create</Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
