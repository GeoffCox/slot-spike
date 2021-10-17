import React from "react";
import { ComponentMeta } from "@storybook/react";
import { PropsChildrenParent } from "./PropsChildrenParent";
import { PlaneComponent } from "./exampleComponents/PlaneComponent";
import { useAutoClearString } from "./useAutoClearString";
import { renderPlane } from "./exampleComponents/renderVehicles";

export default {
  title: "Spike/props.children/only child",
  component: PropsChildrenParent,
} as ComponentMeta<typeof PropsChildrenParent>;

export const SlotContent = () => {
  return (
    <div>
      <div>
        <h3>I can slot a primitive value</h3>
        <PropsChildrenParent>This is a plane (string)</PropsChildrenParent>
      </div>
      <div>
        <h3>I can slot an HTML element</h3>
        <PropsChildrenParent>
          <label>This is a plane (label)</label>
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can slot a component (JSX)</h3>
        <PropsChildrenParent>
          <PlaneComponent description="This is a plane" />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can slot a render function</h3>
        <PropsChildrenParent>
          {renderPlane({ description: "This is a plane" })}
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can slot component props</h3>
        <p style={{ color: "green" }}>
          This is N/A for the props.children approach.
        </p>
      </div>
    </div>
  );
};

export const ReadProps = () => {
  return (
    <div>
      <div>
        <h3>I can read primitive values</h3>
        <PropsChildrenParent storyReadProp="$">
          This is a plane (string)
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can read the props of an HTML element</h3>
        <PropsChildrenParent storyReadProp="defaultValue">
          <input type="text" defaultValue="This is a plane (input)" />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can read the props of a component (JSX)</h3>
        <PropsChildrenParent storyReadProp="description">
          <PlaneComponent description="This is a plane" />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can read the props of a render function</h3>
        <p style={{ color: "green" }}>
          For props.children, this reads the props of the root element, not the
          props passed to the function.
        </p>
        <PropsChildrenParent storyReadProp="title">
          {renderPlane({
            title: "This is a plane",
            description: "Hover for the tooltip",
          })}
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can read the slotted component props</h3>
        <p style={{ color: "green" }}>
          This is N/A for the props.children approach.
        </p>
      </div>
    </div>
  );
};

export const UpdateProps = () => {
  return (
    <div>
      <div>
        <h3>I can modify a primitive value</h3>
        <PropsChildrenParent
          storyUpdateProp={{
            name: "$",
            onUpdate: (value: any) => `Updated: ${value}`,
          }}
        >
          Primitive (string)
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can modify props of an HTML element</h3>
        <PropsChildrenParent
          storyUpdateProp={{
            name: "defaultValue",
            onUpdate: (value: any) => `Updated: ${value}`,
          }}
        >
          <input type="text" defaultValue="This is a plane" />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can modify props of a component (JSX)</h3>
        <PropsChildrenParent
          storyUpdateProp={{
            name: "description",
            onUpdate: (value: any) => `Updated: ${value}`,
          }}
        >
          <PlaneComponent description="This is a plane" />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can modify the props of a render function</h3>
        <p style={{ color: "green" }}>
          For props.children, this reads the props of the root element, not the
          props passed to the function.
        </p>
        <PropsChildrenParent
          storyUpdateProp={{
            name: "title",
            onUpdate: (value: any) => `Updated: ${value}`,
          }}
        >
          {renderPlane({
            title: "This is a plane",
            description: "Hover for the tooltip",
          })}
        </PropsChildrenParent>
      </div>
    </div>
  );
};

export const SubscribeToEvent = () => {
  const [htmlElementMessage, setHtmlElementMessage] = useAutoClearString();
  const [jsxMessage, setJsxMessage] = useAutoClearString();
  const [renderMessage, setRenderMessage] = useAutoClearString();

  return (
    <div>
      <div>
        <h3>I can subscribe to an event of a primitive value</h3>
        <p style={{ color: "green" }}>
          This is N/A. Primitive values do not have any events.
        </p>
      </div>
      <div>
        <h3>I can subscribe to an event (onChange) of an HTML element</h3>
        <PropsChildrenParent
          storySubscribeEvent={{
            name: "onChange",
            onEvent: (value: any) => setHtmlElementMessage("Changed!"),
          }}
        >
          <input type="text" defaultValue="Change some text here" />
        </PropsChildrenParent>
        <div>{htmlElementMessage}</div>
      </div>
      <div>
        <h3>
          I can subscribe to an event (onExampleClick) of a component (JSX).
        </h3>
        <PropsChildrenParent
          storySubscribeEvent={{
            name: "onExampleClick",
            onEvent: (value: any) => setJsxMessage("Clicked!"),
          }}
        >
          <PlaneComponent description="This is a plane" />
        </PropsChildrenParent>
        <div>{jsxMessage}</div>
      </div>
      <div>
        <h3>I can subscribe to an event (onClick) of a render function</h3>
        <PropsChildrenParent
          storySubscribeEvent={{
            name: "onClick",
            onEvent: (value: any) => setRenderMessage("Clicked!"),
          }}
        >
          {renderPlane({ description: "This is a plane" })}
        </PropsChildrenParent>
        <div>{renderMessage}</div>
      </div>
    </div>
  );
};

export const WrapSingleChildEvent = () => {
  const [htmlElementMessage, setHtmlElementMessage] = useAutoClearString();
  const [
    htmlElementChildMessage,
    setHtmlElementChildMessage,
  ] = useAutoClearString();
  const [jsxMessage, setJsxMessage] = useAutoClearString();
  const [jsxChildMessage, setJsxChildMessage] = useAutoClearString();
  const [renderMessage, setRenderMessage] = useAutoClearString();
  const [renderChildMessage, setRenderChildMessage] = useAutoClearString();

  const renderBusWithOnClick = (): React.ReactNode => {
    return (
      <div onClick={() => setRenderChildMessage("Child Clicked!")}>
        {renderPlane({ description: "This is a plane" })}
      </div>
    );
  };

  return (
    <div>
      <div>
        <h3>I can wrap an event of a primitive value</h3>
        <p style={{ color: "green" }}>
          This is N/A. Primitive values do not have any events.
        </p>
      </div>
      <div>
        <h3>I can wrap an event (onChange) of an HTML element</h3>
        <PropsChildrenParent
          storySubscribeEvent={{
            name: "onChange",
            onEvent: (value: any) => setHtmlElementMessage("Changed!"),
          }}
        >
          <input
            type="text"
            defaultValue="Change some text here"
            onChange={() => setHtmlElementChildMessage("Child Changed!")}
          />
        </PropsChildrenParent>
        <div>{htmlElementMessage}</div>
        <div>{htmlElementChildMessage}</div>
      </div>
      <div>
        <h3>I can wrap an event (onExampleClick) of a component (JSX)</h3>
        <PropsChildrenParent
          storySubscribeEvent={{
            name: "onExampleClick",
            onEvent: (value: any) => setJsxMessage("Clicked!"),
          }}
        >
          <PlaneComponent
            description="This is a plane"
            onExampleClick={() => setJsxChildMessage("Child clicked!")}
          />
        </PropsChildrenParent>
        <div>{jsxMessage}</div>
        <div>{jsxChildMessage}</div>
      </div>
      <div>
        <h3>I can wrap an event (onClick) of a render function</h3>
        <PropsChildrenParent
          storySubscribeEvent={{
            name: "onClick",
            onEvent: (value: any) => setRenderMessage("Clicked!"),
          }}
        >
          {renderBusWithOnClick()}
        </PropsChildrenParent>
        <div>{renderMessage}</div>
        <div>{renderChildMessage}</div>
      </div>
    </div>
  );
};

// export const MultipleChildElements = () => {
//   return (
//     <div>
//       <h3>
//         I can provide a primitive value as content within a container control.
//       </h3>
//       <PropsChildrenParent>
//         <div>Element 1</div>
//         <div>Element 2</div>
//         <div>Element 3</div>
//       </PropsChildrenParent>
//     </div>
//   );
// };

// export const HierarchyOfElements = () => {
//   return (
//     <div>
//       <h3>
//         I can provide a primitive value as content within a container control.
//       </h3>
//       <PropsChildrenParent>
//         <div>
//           <div>Element 1A</div>
//           <div>Element 1B</div>
//           <div>Element 1C</div>
//         </div>
//         <div>
//           <div>Element 2A</div>
//           <div>Element 2B</div>
//           <div>Element 2C</div>
//         </div>
//         <div>
//           <div>Element 3A</div>
//           <div>Element 3B</div>
//           <div>Element 3C</div>
//         </div>
//       </PropsChildrenParent>
//     </div>
//   );
// };

// // export const SingleChild = () => (
// //   <div>
// //     <h3>I can use props.children to transpose a single child</h3>
// //     <BasicParent title="Hello Child">
// //       <div>Single child</div>
// //     </BasicParent>
// //   </div>
// // );
