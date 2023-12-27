import { Document, SetContent } from "../../lib/schemas/document";
import PalaborImage from "../../lib/tip-tap/plugins/palabor-image";
import { SoundCloud } from "../../lib/tip-tap/plugins/soundcloud";
import { debounce } from "../../lib/utils";
import { CharacterCount } from "@tiptap/extension-character-count";
import Typography from "@tiptap/extension-typography";
import { Youtube } from "@tiptap/extension-youtube";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PalaborEditorContent from "./editor-content";

type EditorContentProps = Pick<
  Document,
  "id" | "title" | "content" | "user_id"
> & { currentUser: any }; // TODO FIXME, need sessions for logged in users

const saveDocument = (operation: Function) => operation();
const saveDocumentDebounced = debounce(saveDocument as any, 500);

const PalaborEditor = ({
  id,
  title,
  content,
  user_id,
  currentUser,
}: EditorContentProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      PalaborImage.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "w-full h-auto",
        },
      }),
      Youtube.configure({
        modestBranding: true,
        inline: false,
        allowFullscreen: false,
        ccLanguage: "en",
        HTMLAttributes: {
          class: "w-full h-96",
        },
      }),
      SoundCloud.configure({
        autoplay: false,
        inline: false,
        HTMLAttributes: {
          class: "w-full h-96",
        },
      }),
      CharacterCount,
    ],
    autofocus: "start",
    content,
    editable: user_id == currentUser.id,
    editorProps: {
      attributes: {
        class:
          "prose-xl dark:prose-invert min-w-full focus:outline-none scroll-smooth",
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      const plain_text_content = editor.getText();
      const input = { id, content, plain_text_content };
      const documentInput = SetContent.safeParse(input);
      if (!documentInput.success) {
        return;
      }
      const body = JSON.stringify(documentInput.data);
      saveDocumentDebounced(() => {
        fetch(`/api/document`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        });
      });
    },
  });

  return (
    <div className="flex">
      {editor && <PalaborEditorContent id={id} title={title} editor={editor} />}
    </div>
  );
};

export default PalaborEditor;
