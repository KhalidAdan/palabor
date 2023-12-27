import { cn } from "../../lib/utils";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useReducer } from "react";

type ComponentProps = NodeViewProps & {
  src: string;
  alt: string;
  title: string;
};

type ReducerState = {
  activeElement: "alt" | "title";
  editing: boolean;
  src: string;
  alt: string;
  title: string;
};

type ReducerAction = {
  activeElement?: "alt" | "title";
  editing?: boolean;
  src?: string;
  alt?: string;
  title?: string;
};

export const PalaborImageNodeView = (props: ComponentProps) => {
  const { src, alt, title } = props.node.attrs;

  const [event, updateEvent] = useReducer<
    (prev: ReducerState, next: ReducerAction) => ReducerState
  >(
    (prev, next) => {
      const pos = props.getPos();
      const node = props.node;
      node &&
        props.editor.view.state.tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          alt,
          title,
        });
      props.editor.view.dispatch(props.editor.view.state.tr);
      return { ...prev, ...next };
    },
    {
      editing: false,
      src,
      alt,
      title,
      activeElement: "title",
    }
  );

  const updateNodeAttributes = (newAttributes: any) => {
    const pos = props.getPos();
    // Change the type, attributes, and/or marks of the node at pos.
    // When type (second param) isn't given, the existing node type is preserved. Important for custom node types.
    const transaction = props.editor.view.state.tr.setNodeMarkup(
      pos,
      undefined,
      {
        ...props.node.attrs,
        ...newAttributes,
      }
    );
    props.editor.view.dispatch(transaction);
  };

  const handleAttributeChange = (
    attribute: "alt" | "title",
    value: string | null
  ) => {
    updateEvent({ [attribute]: value });
    updateNodeAttributes({ [attribute]: value });
  };

  return (
    <NodeViewWrapper as="span">
      <div
        className={cn(
          {
            "border border-green-500 rounded": event.editing,
          },
          "mb-4 border"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={event.alt}
          title={event.title}
          className="w-full h-auto rounded"
          style={{ margin: 0, display: "block" }}
        />
        <div className="flex justify-between items-center">
          <input
            type="text"
            defaultValue={event.alt}
            onFocus={() => updateEvent({ editing: true })}
            onBlur={() => updateEvent({ editing: false })}
            onChange={(e) => handleAttributeChange("alt", e.target.value)}
            className={cn(
              {
                hidden: event.activeElement == "title",
              },
              "w-full text-center bg-background text-muted-foreground border-none rounded focus:ring-0 focus:outline-none font-sans"
            )}
          />
          <input
            type="text"
            defaultValue={event.title}
            onFocus={() => updateEvent({ editing: true })}
            onBlur={() => updateEvent({ editing: false })}
            onChange={(e) => handleAttributeChange("title", e.target.value)}
            className={cn(
              {
                hidden: event.activeElement == "alt",
              },
              "w-full text-center bg-background text-muted-foreground border-none rounded focus:ring-0 focus:outline-none font-sans"
            )}
          />
          <button
            onClick={() =>
              updateEvent({
                activeElement: event.activeElement == "alt" ? "title" : "alt",
                editing: true,
              })
            }
            onBlur={() => updateEvent({ editing: false })}
            className="text-xs px-1 py-0 border rounded h-4.5 mr-2 hover:text-green-500 hover:border-green-500"
          >
            {event.activeElement == "alt" ? "alt" : "title"}
          </button>
        </div>
      </div>
    </NodeViewWrapper>
  );
};
