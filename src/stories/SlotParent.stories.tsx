import React from "react";
import { ComponentMeta } from "@storybook/react";
import { SlotParent } from "./SlotParent";
import { ExampleComponent } from "./ExampleComponent";
import { ShorthandRenderFunction } from "./slots/types";
import { renderBus } from "./renderBus";

export default {
  title: "Spike/slot attributes",
  component: SlotParent,
} as ComponentMeta<typeof SlotParent>;

export const SlotContent = () => {
  return (
    <div>
      <div>
        <h3>I can slot a primitive value.</h3>
        <SlotParent content="This is a bus (string)" />
      </div>
      <div>
        <h3>I can slot an HTML element.</h3>
        <SlotParent content={<label>This is a bus (label)</label>} />
      </div>
      <div>
        <h3>I can slot a component (JSX).</h3>
        <SlotParent
          content={<ExampleComponent description="This is a bus" />}
        />
      </div>
      <div>
        <h3>I can slot a render function.</h3>
        {/* //Strange to have to pass the function as children rather than directly.
        //Possible issue with the way getShorthand works */}
        <SlotParent
          content={{ children: renderBus({ description: "This is a bus" }) }}
        />
      </div>
      <div>
        <h3>I can slot component props.</h3>
        <SlotParent exampleComponent={{ description: "This is a bus" }} />
      </div>
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
