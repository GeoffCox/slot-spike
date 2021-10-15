import React from "react";
import { ComponentMeta } from "@storybook/react";
import { SlotParent } from "./SlotParent";
import { ExampleComponent } from "./ExampleComponent";
import { ShorthandRenderFunction } from "./slots/types";

export default {
  title: "Spike/slot attributes",
  component: SlotParent,
} as ComponentMeta<typeof SlotParent>;

export const SlotContent = () => {
  const renderChild: ShorthandRenderFunction<
    React.HTMLAttributes<HTMLElement>
  > = (component, props): React.ReactNode => {
    return (
      <div>
        <p>A render function</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    );
  };

  return (
    <div>
      <div>
        <h3>I can slot a primitive value.</h3>
        <SlotParent content="Primitive (string)" />
      </div>
      <div>
        <h3>I can slot an HTML element.</h3>
        <SlotParent content={<label>HTML element (label)</label>} />
      </div>
      <div>
        <h3>I can slot a component (JSX).</h3>
        <SlotParent
          content={<ExampleComponent description="This is a bus" />}
        />
      </div>
      <div>
        <p>I can slot a render function.</p>
        {/* //Strange to have to pass the function as children rather than directly.
        //Possible issue with the way getShorthand works */}
        <SlotParent content={{ children: renderChild }} />
      </div>
      <div>
        <p>I can slot component props.</p>
        <SlotParent exampleComponent={{ description: "This is a bus" }} />
      </div>
    </div>
  );
};

export const SinglePropsChild = () => {
  return (
    <div>
      <p>I can slot component props.</p>
      <SlotParent exampleComponent={{ description: "This is a bus" }} />
    </div>
  );
};

export const ReadSingleChildProps = () => {
  return (
    <div>
      <p>I can read the props of a child.</p>
      <SlotParent
        exampleComponent={{ description: "This is a bus" }}
        storyReadProps
      />
    </div>
  );
};

export const UpdateSingleChildProps = () => {
  return (
    <div>
      <p>I can modify the props of a child.</p>
      <SlotParent
        exampleComponent={{ description: "This is a bus" }}
        storyUpdateProps
      />
    </div>
  );
};

export const SubscribeToSingleChildEvent = () => {
  return (
    <div>
      <p>I can subscribe to an event (callback) of a child.</p>
      <SlotParent
        exampleComponent={{ description: "This is a bus" }}
        storyHandleClick
      />
    </div>
  );
};

export const WrapSingleChildEvent = () => {
  const [clickMessage, setClickMessage] = React.useState("");

  React.useEffect(() => {
    const clickTimeout = setTimeout(() => {
      setClickMessage("");
    }, 1000);

    return () => {
      clearTimeout(clickTimeout);
    };
  }, [clickMessage]);

  /*
BUGBUG ?
If you try and use the JSX syntax, then the resolveShorthand puts the props on children.
This doesn't happen when you pass props.
This makes the state shape vary depending on how the slot is filled in!

<ExampleComponent
            description="This is a bus"
            onExampleClick={() => setClickMessage("Child clicked!")}
          />
*/

  return (
    <div>
      <p>I can wrap to an event (callback) of a child.</p>
      <SlotParent
        exampleComponent={{
          description: "This is a bus",
          onExampleClick: () => setClickMessage("Child clicked!"),
        }}
        storyHandleClick
      />
      <div>{clickMessage}</div>
    </div>
  );
};
