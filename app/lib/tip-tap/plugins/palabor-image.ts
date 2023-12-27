import { PalaborImageNodeView } from "@/components/tiptap/palabor-image";
import { Image } from "@tiptap/extension-image";
import { PluginKey } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import {
  ReactNodeViewRenderer,
  mergeAttributes,
  nodePasteRule,
} from "@tiptap/react";
import { Plugin } from "prosemirror-state";

export interface PalaborImageOptions {
  HTMLAttributes: Record<string, any>;
  inline: boolean;
  allowFileUploads: boolean;
  allowBase64: boolean;
}

const insertImage = (view: EditorView, imageUrl: string) => {
  const { schema } = view.state;
  const pImageNode = schema.nodes["palabor-image"].create({
    src: imageUrl,
  });
  const transaction = view.state.tr.replaceSelectionWith(pImageNode);
  view.dispatch(transaction);
  view.focus();
};

const handleFiles = (view: EditorView, files: File[]) => {
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      insertImage(view, readerEvent.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
};

const handleDrop = (view: EditorView, event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
  const dataTransfer = event.dataTransfer;
  if (!dataTransfer?.files.length) {
    return;
  }

  const files = Array.from(dataTransfer.files).filter((file) =>
    /image/i.test(file.type)
  );

  handleFiles(view, files);

  return false; // return false so that other plugins or the default behavior can handle the event if this plugin doesn’t
};

const handlePaste = (view: EditorView, event: ClipboardEvent): boolean => {
  event.stopPropagation();

  const items = event.clipboardData?.items;
  const files: File[] = [];

  if (!items) {
    return false;
  }

  for (let i = 0; i < items.length; i++) {
    if (/image/i.test(items[i].type)) {
      files.push(items[i].getAsFile() as File);
    }
  }

  handleFiles(view, files);

  return false; // return false so that other plugins or the default behavior can handle the event if this plugin doesn’t
};

const PalaborImage = Image.extend<PalaborImageOptions>({
  name: "palabor-image",
  draggable: true,
  addOptions() {
    return {
      inline: false,
      allowFileUploads: true,
      allowBase64: true,
      HTMLAttributes: {},
    };
  },
  addAttributes() {
    return {
      src: {
        default: null,
        renderHTML: (attributes) => {
          if (!attributes.src) {
            return {};
          }
          return {
            src: attributes.src,
          };
        },
      },
      alt: {
        default: null,
        renderHTML: (attributes) => {
          if (!attributes.alt) {
            return {};
          }
          return {
            alt: attributes.alt,
          };
        },
      },
      title: {
        default: null,
        renderHTML: (attributes) => {
          if (!attributes.title) {
            return {};
          }
          return {
            title: attributes.title,
          };
        },
      },
    };
  },
  addPasteRules() {
    return [
      nodePasteRule({
        find: /https?:\/\/\S+\.(?:png|jpg|jpeg|gif|webp)/gi,
        type: this.type,
        getAttributes: (match) => {
          return { src: match[0].trim() };
        },
      }),
    ];
  },
  parseHTML() {
    return [
      {
        tag: "figure img[src]",
        contentElement: "img[src]",
        getAttrs: (node: any) => {
          const image = node.querySelector("img");
          const figcaption = node.querySelector("figcaption");
          return {
            src: image?.getAttribute("src"),
            alt: image?.getAttribute("alt"),
            title: figcaption?.textContent,
          };
        },
      },
      {
        tag: "figcaption",
        ignore: true,
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      {},
      ["img", mergeAttributes(HTMLAttributes)],
      ["figcaption", {}, HTMLAttributes.title || ""],
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(PalaborImageNodeView);
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("imageDropPastePlugin"),
        props: {
          handleDOMEvents: {
            drop(view, event) {
              return handleDrop(view, event);
            },
            paste(view, event) {
              return handlePaste(view, event);
            },
          },
        },
      }),
    ];
  },
});

export default PalaborImage;
