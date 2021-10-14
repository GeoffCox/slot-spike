import React from "react";
import "./spike.css";
import { getNativeElementProps } from "./slots/getNativeElementProps";
import { getSlots } from "./slots/getSlots";
import { resolveShorthand } from "./slots/resolveShorthand";
import {
  ComponentProps,
  ComponentState,
  IntrinsicShorthandProps,
  ObjectShorthandProps,
} from "./slots/types";
import { ExampleComponent, ExampleComponentProps } from "./ExampleComponent";

type Slots = {
  root: IntrinsicShorthandProps<"div">;
  content?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
  exampleComponent?: ObjectShorthandProps<ExampleComponentProps>;
};

type StoryOptions = {
  storyReadProps?: boolean;
  storyUpdateProps?: boolean;
  storyHandleClick?: boolean;
};

type Props = ComponentProps<Slots> & StoryOptions;

type State = ComponentState<Slots>;

export const SlotParent = (props: Props) => {
  const {
    content,
    exampleComponent,
    storyReadProps,
    storyUpdateProps,
    storyHandleClick,
  } = props;

  // ----- Hooks ----- //
  const [clickMessage, setClickMessage] = React.useState("");

  React.useEffect(() => {
    const clickTimeout = setTimeout(() => {
      setClickMessage("");
    }, 1000);

    return () => {
      clearTimeout(clickTimeout);
    };
  }, [clickMessage]);

  // ----- Props => State ----- //

  const state: State = {
    ...props,

    components: {
      root: "div",
      content: "div",
      exampleComponent: ExampleComponent,
    },

    root: getNativeElementProps("div", { ...props }),
    content: resolveShorthand(content, {}),
    exampleComponent: resolveShorthand(exampleComponent, {}),
  };

  // ----- State => State ----- //

  let description = "";
  if (state.exampleComponent) {
    if (storyReadProps) {
      description = `Read from child: ${state.exampleComponent?.description}`;
    }

    if (storyUpdateProps) {
      state.exampleComponent.description = `Updated: ${state.exampleComponent.description}`;
    }

    if (storyHandleClick) {
      const onClick = state.exampleComponent?.onExampleClick;
      state.exampleComponent.onExampleClick = () => {
        setClickMessage("Clicked!");
        onClick && onClick();
      };
    }
  }

  // ----- State => Slots & SlotProps ----- //

  const { slots, slotProps } = getSlots<Slots>(state, [
    "root",
    "content",
    "exampleComponent",
  ]);

  // ----- Render ----- //

  return (
    <div className="parent">
      <div className="child">
        <slots.root {...slotProps.root}>
          <slots.content {...slotProps.content} />
          <slots.exampleComponent {...slotProps.exampleComponent} />
        </slots.root>
      </div>
      <div>{description}</div>
      <div>{clickMessage}</div>
    </div>
  );
};
