import { Icons } from "../ui/icons";
import { cn } from "../../lib/utils";
import { BubbleMenu, BubbleMenuProps, Editor } from "@tiptap/react";
import { FC } from "react";
import { Button } from "../ui/button";

export interface MenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: (typeof Icons)[keyof typeof Icons];
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, "children" | "editor"> & {
  editor: Editor;
};

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  const { editor } = props;

  const items: MenuItem[] = [
    {
      name: "h2",
      isActive: () => editor.isActive("heading", { level: 2 }),
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      icon: Icons.heading2,
    },
    {
      name: "h3",
      isActive: () => editor.isActive("heading", { level: 3 }),
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      icon: Icons.heading3,
    },
    {
      name: "bold",
      isActive: () => editor.isActive("bold"),
      command: () => editor.chain().focus().toggleBold().run(),
      icon: Icons.bold,
    },
    {
      name: "italic",
      isActive: () => editor.isActive("italic"),
      command: () => editor.chain().focus().toggleItalic().run(),
      icon: Icons.italic,
    },
    {
      name: "strike",
      isActive: () => editor.isActive("strike"),
      command: () => editor.chain().focus().toggleStrike().run(),
      icon: Icons.strikeThrough,
    },
    {
      name: "code",
      isActive: () => editor.isActive("code"),
      command: () => editor.chain().focus().toggleCode().run(),
      icon: Icons.code,
    },
    {
      name: "horizontalRule",
      isActive: () => editor.isActive("horizontalRule"),
      command: () => editor.chain().focus().setHorizontalRule().run(),
      icon: Icons.horizontalRule,
    },
    {
      name: "bulletList",
      isActive: () => editor.isActive("bulletList"),
      command: () => editor.chain().focus().toggleBulletList().run(),
      icon: Icons.bulletList,
    },
    {
      name: "orderedList",
      isActive: () => editor.isActive("orderedList"),
      command: () => editor.chain().focus().toggleOrderedList().run(),
      icon: Icons.orderedList,
    },
  ];

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
  };

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="flex p-2 w-fit rounded-xl bg-primary-foreground border border-input shadow-md"
    >
      <div className="flex items-center gap-4">
        {items.map((item, index) => (
          <Button
            size="icon"
            variant="ghost"
            key={index}
            onClick={item.command}
            type="button"
          >
            <item.icon
              size={24}
              className={cn("h-6 w-6", {
                "text-blue-500": item.isActive(),
              })}
            />
          </Button>
        ))}
      </div>
    </BubbleMenu>
  );
};
