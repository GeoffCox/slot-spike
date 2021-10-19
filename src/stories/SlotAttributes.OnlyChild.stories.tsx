import React from "react";
import { ComponentMeta } from "@storybook/react";
import { SlotParent } from "./SlotParent";
import { PlaneComponent } from "./exampleComponents/PlaneComponent";
import { renderPlane } from "./exampleComponents/renderVehicles";

export default {
  title: "Spike/slot attributes/1-only child",
  component: SlotParent,
} as ComponentMeta<typeof SlotParent>;

export const SlotContent = () => {
  return (
    <div>
      <div>
        <h3>I can slot a primitive value</h3>
        <SlotParent content="This is a plane (string)" />
      </div>
      <div>
        <h3>I can slot an HTML element</h3>
        <SlotParent content={<label>This is a plane (label)</label>} />
      </div>
      <div>
        <h3>I can slot a component (JSX)</h3>
        <SlotParent
          content={<PlaneComponent description="This is a plane" />}
        />
      </div>
      <div>
        <h3>I can slot a render function</h3>
        {/* //Strange to have to pass the function as children rather than directly.
        //Possible issue with the way getShorthand works */}
        <SlotParent
          content={{
            children: renderPlane({ description: "This is a plane" }),
          }}
        />
      </div>
      <div>
        <h3>I can slot component props</h3>
        <SlotParent
          exampleComponentType="plane"
          exampleComponent={{ description: "This is a plane" }}
        />
      </div>
    </div>
  );
};

export const ReadProps = () => {
  return (
    <div>
      <div>
        <h3>I can read a primitive value.</h3>
        <SlotParent content="This is a plane (string)" storyReadProp="$" />
      </div>
      <div>
        <h3>I can read the props of an HTML element</h3>
        <SlotParent
          content={
            <input
              type="text"
              defaultValue="This is a plane (input)"
              style={{ display: "block" }}
            />
          }
          storyReadProp="defaultValue"
        />
      </div>
      <div>
        <h3>I can read the props of a component (JSX)</h3>
        <SlotParent
          content={<PlaneComponent description="This is a plane" />}
          storyReadProp="description"
        />
      </div>
      <div>
        <h3>I can read the props of a render function</h3>
        {/* //Strange to have to pass the function as children rather than directly.
        //Possible issue with the way getShorthand works */}
        <SlotParent
          content={{
            children: renderPlane({ description: "This is a plane" }),
          }}
          storyReadProp="description"
        />
      </div>
      <div>
        <h3>I can read component props.</h3>
        <SlotParent
          exampleComponentType="plane"
          exampleComponent={{ description: "This is a plane" }}
          storyReadProp="description"
        />
      </div>
    </div>
  );
};

export const UpdateProps = () => {
  return (
    <div>
      <h3>I can modify the component props.</h3>
      <SlotParent
        exampleComponentType="plane"
        exampleComponent={{ description: "This is a plane" }}
        storyUpdateProps
      />
    </div>
  );
};

// export const SubscribeToEvent = () => {
//   return (
//     <div>
//       <p>I can subscribe to an event (callback) of a child.</p>
//       <SlotParent
//         exampleComponent={{ description: "This is a plane" }}
//         storyHandleClick
//       />
//     </div>
//   );
// };

export const SubscribeToEvent = () => {
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
            description="This is a plane"
            onExampleClick={() => setClickMessage("Child clicked!")}
          />
*/

  return (
    <div>
      <p>I can wrap to an event (callback) of a child.</p>
      <SlotParent
        exampleComponentType="plane"
        exampleComponent={{
          description: "This is a plane",
          onExampleClick: () => setClickMessage("Child clicked!"),
        }}
        storyHandleClick
      />
      <div>{clickMessage}</div>
    </div>
  );
};
