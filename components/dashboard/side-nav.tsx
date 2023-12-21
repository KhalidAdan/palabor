import { UserType } from "@/lib/session";
import { cn } from "@/lib/utils";
import { Work } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Icons } from "../ui/icons";
import { ActiveWorkSelector } from "./active-work";

export const SideNav = ({
  user,
  className,
  activeWork,
  allWorks,
}: {
  user: NonNullable<UserType>;
  className?: string;
  activeWork: Work;
  allWorks?: Work[];
}) => {
  return (
    <nav
      className={cn(
        "flex flex-col rounded-xl bg-slate-600 dark:bg-slate-700 text-secondary m-4",
        className
      )}
    >
      <header className="flex items-center mx-8 mt-6 mb-10">
        <Link href="/">
          <span className="text-xl font-semibold text-white">Palabor.</span>
        </Link>
      </header>
      {allWorks && (
        <ActiveWorkSelector activeWork={activeWork} allWorks={allWorks} />
      )}
      <ul className="flex flex-col flex-1 gap-1 m-4">
        <li>
          <span className="uppercase text-xs mx-3 text-white">Writing</span>
        </li>

        <li className="flex flex-col">
          <ul role="list" className="space-y-2">
            <SideNavItem
              className="px-3 py-2"
              href={`/${activeWork.slug}/dashboard`}
            >
              <Icons.table className="mr-1 h-6 w-6" />
              Dashboard
            </SideNavItem>

            <SideNavItem className="px-3 py-2" href={`/creative-works`}>
              <Icons.document className="mr-1 h-6 w-6" />
              Creative Works
            </SideNavItem>
          </ul>
        </li>

        <li className="mt-6">
          <ul role="list" className="space-y-2">
            <span className="uppercase text-xs mx-3 text-white">Account</span>

            <SideNavItem
              className="px-3 py-2 cursor-pointer"
              href={`/${activeWork.slug}/dashboard/billing`}
            >
              <Icons.billing className="mr-1 h-6 w-6" /> Billing
            </SideNavItem>

            <SideNavItem
              className="px-3 py-2"
              href={`/${activeWork.slug}/dashboard/settings`}
            >
              <Icons.settings className="mr-1 h-6 w-6" />
              Settings
            </SideNavItem>
          </ul>
        </li>

        <li className="mt-6">
          <span className="uppercase text-xs mx-3 text-white">Audience</span>
        </li>
        <SideNavItem className="px-3 py-2">
          <Icons.users className="mr-1 h-6 w-6" />
          Readers
        </SideNavItem>
        <SideNavItem className="px-3 py-2">
          <Icons.email className="mr-1 h-6 w-6" />
          Emails
          <span className="text-xs self-center">(coming soon!)</span>
        </SideNavItem>

        <SideNavItem className="px-3 py-2">
          <Icons.graph className="mr-1 h-6 w-6" /> Analytics
          <span className="text-xs self-center">(coming soon!)</span>
        </SideNavItem>

        <li className="mt-6">
          <span className="uppercase text-xs mx-3 text-white">Community</span>
        </li>
        <SideNavItem className="px-3 py-2">
          <Icons.search className="mr-1 h-6 w-6" />
          Discover
        </SideNavItem>
        <SideNavItem className="px-3 py-2">
          <Icons.bookmark className="mr-1 h-6 w-6" />
          Bookmarks
        </SideNavItem>
        <SideNavItem className="px-3 py-2">
          <Icons.megaPhone className="mr-1 h-6 w-6" />
          Reviews
        </SideNavItem>

        <SideNavItem className="mt-auto p-4 justify-between">
          <div className="flex items-end gap-2">
            <Avatar>
              <AvatarImage
                src={user.image ?? undefined}
                alt="user image or placeholder"
              />
              <AvatarFallback>
                <Icons.user />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="leading-[1.0] tracking-normal">{user.name}</p>

              <small className="text-xs leading-[1.0] tracking-normal">
                {user.email}
              </small>
            </div>
          </div>
          <Icons.settings className="h-6 w-6 self-center" />
        </SideNavItem>
      </ul>
    </nav>
  );
};

export const SideNavItem = ({
  children,
  className,
  href,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  disabled?: boolean;
}) => {
  let component = (
    <li
      className={cn(
        "flex items-end gap-1 rounded-lg text-white",
        className,
        disabled
          ? "cursor-not-allowed"
          : "border border-slate-600 dark:border-slate-700 hover:bg-slate-500 dark:hover:bg-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
      )}
    >
      {children}
    </li>
  );
  if (href) {
    component = (
      <li>
        <Link
          href={href}
          className={cn(
            "flex items-end gap-1 rounded-lg text-white",
            className,
            disabled
              ? "cursor-not-allowed"
              : "border border-slate-600 dark:border-slate-700 hover:bg-slate-500 dark:hover:bg-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
          )}
        >
          {children}
        </Link>
      </li>
    );
  }

  return component;
};
