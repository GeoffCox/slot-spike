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
import { ExampleComponentProps } from "./exampleComponents/ExampleComponentProps";
import { PlaneComponent } from "./exampleComponents/PlaneComponent";
import { TrainComponent } from "./exampleComponents/TrainComponent";
import { AutomobileComponent } from "./exampleComponents/AutomobileComponent";

type Slots = {
  root: IntrinsicShorthandProps<"div">;
  content?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
  exampleComponent?: ObjectShorthandProps<ExampleComponentProps>;
};

type StoryOptions = {
  // a property name to read from the children, $ to read primitive value
  storyReadProp?: string;
  storyUpdateProps?: boolean;
  storyHandleClick?: boolean;
};

type Props = ComponentProps<Slots> &
  StoryOptions & {
    exampleComponentType?: "plane" | "train" | "automobile";
  };

type State = ComponentState<Slots>;

export const SlotParent = (props: Props) => {
  const {
    content,
    exampleComponent,
    storyReadProp,
    storyUpdateProps,
    storyHandleClick,
    exampleComponentType,
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

  const getExampleComponent = () => {
    switch (exampleComponentType) {
      case "train":
        return TrainComponent;
      case "automobile":
        return AutomobileComponent;
      case "plane":
      default:
        return PlaneComponent;
    }
  };

  const state: State = {
    ...props,

    components: {
      root: "div",
      content: "div",
      exampleComponent: getExampleComponent(),
    },

    root: getNativeElementProps("div", { ...props }),
    content: resolveShorthand(content, {}),
    exampleComponent: resolveShorthand(exampleComponent, {}),
  };

  // ----- State => State ----- //

  let readProps: string[] = [];
  if (storyReadProp && storyReadProp.length > 0) {
    /*
    BUGBUG: Figuring out all the different kinds of slot/children/props may not be done right here.
    This goes back to the children vs object with resolveShorthand
    */
    if (state.content?.children) {
      if (storyReadProp === "$") {
        readProps.push(`${state.content.children}`);
      } else {
        const anyComponent: any = state.content.children as any;
        if (anyComponent?.props?.[storyReadProp]) {
          readProps.push(`${anyComponent.props[storyReadProp]}`);
        }
      }
    }

    if (state.exampleComponent) {
      const anyComponent: any = state.exampleComponent as any;
      if (anyComponent?.[storyReadProp]) {
        readProps.push(`${anyComponent[storyReadProp]}`);
      }
    }
  }

  if (storyUpdateProps && state.exampleComponent) {
    state.exampleComponent.description = `Updated: ${state.exampleComponent.description}`;
  }

  if (storyHandleClick && state.exampleComponent) {
    const onClick = state.exampleComponent?.onExampleClick;
    state.exampleComponent.onExampleClick = () => {
      setClickMessage("Clicked!");
      onClick && onClick();
    };
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
      {storyReadProp && (
        <div>
          <div>Property: {storyReadProp}</div>
          <div>
            {readProps.map((propValue) => {
              return <div>{propValue}</div>;
            })}
          </div>
        </div>
      )}
      <div>{clickMessage}</div>
    </div>
  );
};
