"use client";

import { cn } from "../../lib/utils";
import { Work } from "@prisma/client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link } from "@remix-run/react";

const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

// TODO type this
function getLastPublishedText(document: any): string {
  // Handle null or undefined documents
  if (!document) {
    return "No posts yet";
  }

  // Calculate days since last publication
  const publicationDate = document.publication_date
    ? new Date(document.publication_date)
    : new Date();
  const daysSinceLastPublished = Math.floor(
    (new Date().getTime() - publicationDate.getTime()) / MILLISECONDS_IN_A_DAY
  );

  // Handle published and draft documents
  if (document.status === "published") {
    return daysSinceLastPublished === 0
      ? "Published today"
      : `Last published ${daysSinceLastPublished} days ago`;
  } else if (document.status === "draft") {
    return document.publication_date
      ? `Scheduled post on ${publicationDate.toLocaleDateString()}`
      : "No post scheduled";
  }

  // Status is archived
  return "No posts yet";
}

// TODO type this
const SelectCreativeWork = ({ works }: { works: any }) => {
  const [selectedWork, setSelectedWork] = useState<Work["slug"]>();
  return (
    <div>
      <RadioGroup className="grid grid-cols-2 gap-1 md:gap-4 mb-24 mt-2">
        {works.map((work: any, i: number) => {
          const lastPublished = getLastPublishedText(work.documents);
          return (
            <div
              key={i}
              className={cn(
                works.length % 2 !== 0 && i === works.length - 1 && "col-span-2"
              )}
            >
              <RadioGroupItem
                value={work.slug}
                id={work.slug}
                className="peer sr-only"
                onClick={(event) => setSelectedWork(event.currentTarget.value)}
                tabIndex={i + 1}
              />
              <Label
                htmlFor={work.slug}
                className="
                h-full flex flex-col rounded-md 
                border-2 border-muted 
                bg-transparent hover:bg-accent 
                peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary
                peer-focus-visible:outline-primary peer-focus-visible:outline-4 peer-focus-visible:outline-offset-2 peer-focus-visible:outline
                p-6 cursor-pointer"
                tabIndex={-1}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-1 text-sm font-light">
                      <Icons.calendar className="inline mr-1 h-5 w-5" />
                      {lastPublished}
                    </h2>
                    {work.slug == selectedWork ? (
                      <Icons.check className="h-4 w-4 text-primary" />
                    ) : (
                      <Icons.circle className="h-4 w-4 text-muted" />
                    )}
                  </div>
                  <p className="text-2xl font-bold">{work.title}</p>
                </div>

                <p className="font-[300] mt-3">{work.description}</p>
                <span className="text-sm text-muted-foreground mt-6">
                  {work.readers} readers
                </span>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
      <section className="flex gap-1 md:gap-4">
        <Button className="flex-1" asChild tabIndex={works.length + 1}>
          <Link to="/create-work?force=true">
            <Icons.add className="mr-2 h-4 w-4" /> Create a new one
          </Link>
        </Button>
        <Button
          variant="secondary"
          className="flex-1"
          asChild
          tabIndex={works.length + 2}
        >
          <Link to={`/${selectedWork}/dashboard`}>
            <Icons.arrowRight className="mr-2 h-4 w-4" /> Continue with selected
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default SelectCreativeWork;
