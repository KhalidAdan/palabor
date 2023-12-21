import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserType } from "@/lib/session";
import { Document, Work } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";

interface DocumentType extends Omit<Document, "user" | "work"> {
  user: UserType;
  work: Work | null;
}

type RecentDocumentsProps = {
  documents: DocumentType[];
  work: Work;
};

const getDateAsInterval = (date: string | Date) => {
  const now = new Date(date);
  const diff = now.getTime() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return "Today";
  }

  if (days === 1) {
    return "Yesterday";
  }

  return `${days} days ago`;
};

export const RecentDocuments = ({ documents, work }: RecentDocumentsProps) => {
  return (
    <div className="rounded-lg w-full border">
      <Table>
        {/* <TableCaption className="my-4">Recent posts</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Open Rate</TableHead>
            <TableHead className="text-center">Views</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((a) => (
            <TableRow key={a.id}>
              <TableCell>
                <div>
                  <span>{a.title}</span>
                  <div className="flex gap-2">
                    <span className="opacity-50">
                      By <Link href="#">{a.user?.name ?? a.user?.email}</Link> -{" "}
                      {getDateAsInterval(a.created_at!)}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <span className="capitalize">{a.status}</span>
              </TableCell>
              <TableCell className="text-center"></TableCell>
              <TableCell className="text-center"></TableCell>
              <TableCell className="text-center">
                <Button variant="outline" asChild>
                  <Link href={`/${work.slug}/document/${a.id}`}>
                    <Icons.pencil className="mr-2 h-4 w-4" /> Edit
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
