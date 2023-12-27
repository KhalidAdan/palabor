"use client";
import { Editor } from "@tiptap/react";
import { ComponentProps, useLayoutEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";

type TitleTextAreaProps = {
  editor: Editor;
  documentId: number;
} & ComponentProps<"textarea">;

export const TitleTextArea = ({
  editor,
  documentId,
  ...rest
}: TitleTextAreaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        editor.chain().focus().run();
      }
    };

    // new CSS solution for auto resizing textareas is on Chrome -> field-sizing: content; Once adopted, can remove this
    const handleInputResize = () => {
      textAreaRef.style.setProperty("height", "auto");
      textAreaRef.style.setProperty("height", `${textAreaRef.scrollHeight}px`);
    };

    if (!ref.current) return;
    const textAreaRef = ref.current;
    handleInputResize();

    textAreaRef.addEventListener("input", handleInputResize);
    textAreaRef.addEventListener("keydown", handleKeydown);

    return () => {
      textAreaRef.removeEventListener("input", handleInputResize);
      textAreaRef.removeEventListener("keydown", handleKeydown);
    };
  });

  return (
    <Textarea
      {...rest}
      ref={ref}
      placeholder="Title."
      autoFocus
      rows={1}
      onChange={async (event) => {
        fetch(`/api/document`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: documentId,
            title: event.target.value,
          }),
        });
      }}
      className="border-none resize-none w-full text-6xl mt-2 mb-8 p-0 bg-transparent focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 font-bold overflow-hidden"
    />
  );
};
