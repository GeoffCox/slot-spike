import React from "react";
import { ComponentMeta } from "@storybook/react";
import { PropsChildrenParent } from "./PropsChildrenParent";
import { ExampleComponent } from "./ExampleComponent";

export default {
  title: "Spike/props.children",
  component: PropsChildrenParent,
} as ComponentMeta<typeof PropsChildrenParent>;

export const SingleChild = () => {
  const renderChild = (): React.ReactNode => {
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
        <PropsChildrenParent>Primitive (string)</PropsChildrenParent>
      </div>
      <div>
        <h3>I can slot an HTML element.</h3>
        <PropsChildrenParent>
          <label>HTML element (label)</label>
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can slot a component (JSX).</h3>
        <PropsChildrenParent>
          <ExampleComponent />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can slot a render function.</h3>
        <PropsChildrenParent>{renderChild()}</PropsChildrenParent>
      </div>
      <div>
        <h3>I can slot component props.</h3>
        <p style={{ color: "green" }}>
          This is N/A for the props.children approach.
        </p>
      </div>
    </div>
  );
};

export const ReadSingleChildProps = () => {
  const renderChild = (props: { title: string }): React.ReactNode => {
    return (
      <div title={props.title}>
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
        <h3>I can read the props of a primitive value</h3>
        <PropsChildrenParent storyReadProp="$">
          Primitive (string)
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can read the props of an HTML element.</h3>
        <PropsChildrenParent storyReadProp="value">
          <input type="text" value="This is a bus" />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can read the props of a component (JSX).</h3>
        <PropsChildrenParent storyReadProp="description">
          <ExampleComponent description="This is a bus" />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can read the props of a render function.</h3>
        <p style={{ color: "green" }}>
          For props.children, this reads the props of the root element, not the
          props passed to the function.
        </p>
        <PropsChildrenParent storyReadProp="title">
          {renderChild({
            title: "This is the title of the render function's root element",
          })}
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can read the slotted component props.</h3>
        <p style={{ color: "green" }}>
          This is N/A for the props.children approach.
        </p>
      </div>
    </div>
  );
};

export const UpdateSingleChildProps = () => {
  return (
    <div>
      <h3>I can modify the props of a child.</h3>
      <PropsChildrenParent storyUpdateProps>
        <ExampleComponent description="This is a bus" />
      </PropsChildrenParent>
    </div>
  );
};

export const SubscribeSingleChildCallback = () => {
  return (
    <div>
      <h3>I can subscribe to an callback (event) of a child.</h3>
      <PropsChildrenParent storyHandleClick>
        <ExampleComponent description="This is a bus" />
      </PropsChildrenParent>
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

  return (
    <div>
      <h3>I can subscribe to an callback (event) of a child.</h3>
      <PropsChildrenParent storyHandleClick>
        <ExampleComponent
          description="This is a bus"
          onExampleClick={() => setClickMessage("Child clicked!")}
        />
      </PropsChildrenParent>
      <div>{clickMessage}</div>
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
// //     <h3>I can use props.children to transpose a single child.</h3>
// //     <BasicParent title="Hello Child">
// //       <div>Single child</div>
// //     </BasicParent>
// //   </div>
// // );
