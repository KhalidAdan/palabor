"use client";

import { Work } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type ActiveWorkProps = ComponentProps<"section"> & {
  activeWork: Work;
  allWorks: Work[];
};

export const ActiveWorkSelector = ({
  activeWork,
  allWorks,
}: ActiveWorkProps) => {
  const router = useRouter();
  return (
    <section className="ml-8 mr-4 space-y-1">
      <span className="uppercase text-xs text-white">Active body of work</span>
      <Select
        defaultValue={activeWork.slug}
        onValueChange={(value) => router.push(`/${value}/dashboard`)}
      >
        <SelectTrigger className="bg-slate-300 dark:bg-slate-900 dark:border-slate-500 text-primary round rounded-xl -ml-4">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-300 dark:bg-slate-900 dark:border-slate-500 text-primary">
          <SelectGroup>
            {/* <SelectItem value="bonus-action">Bonus Action</SelectItem>
            <SelectItem value="hiiifantasy">HiiiFantasy</SelectItem> */}
            {allWorks.map((work) => (
              <SelectItem key={work.id} value={work.slug}>
                {work.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  );
};
