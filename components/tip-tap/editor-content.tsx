"use client";

import { useReadTime } from "../../hooks/use-read-time";
import { DocumentType } from "../../lib/schemas/document";
import { cn } from "../../lib/utils";
import { Editor, EditorContent, isNodeSelection } from "@tiptap/react";
import { EditorBubbleMenu } from "./editor-bubble-menu";
import { TitleTextArea } from "./editor-title-text-area";

type EditorContentProps = Pick<DocumentType, "id" | "title"> & {
  editor: Editor;
};

const PalaborEditorContent = ({ id, title, editor }: EditorContentProps) => {
  const { readTimeLabel } = useReadTime({
    text: editor?.getText() || "Initial",
    speed: "normal",
  });

  return (
    <div className="container max-w-screen-md">
      {editor && (
        <div className="flex gap-2 items-center fixed bottom-6 right-6 text-sm font-normal px-3 py-2 bg-primary-foreground z-10 rounded-lg">
          {editor.storage.characterCount.words()} words
          <span>- {readTimeLabel}</span>
        </div>
      )}
      {editor && (
        <TitleTextArea editor={editor} defaultValue={title} documentId={id} />
      )}
      {editor && (
        <EditorBubbleMenu
          shouldShow={({ state, editor }) => {
            if (
              editor.isActive("image") ||
              state.selection.empty ||
              isNodeSelection(state.selection)
            ) {
              return false;
            }
            return true;
          }}
          editor={editor}
        />
      )}
      <div className="min-h-[500px] w-full mb-40 prose-xl dark:prose-invert prose-ul:list-disc prose-ol:list-decimal">
        {editor && (
          <EditorContent editor={editor} className={cn("bg-background")} />
        )}
      </div>
    </div>
  );
};

export default PalaborEditorContent;
