import React from "react";
import { ComponentMeta } from "@storybook/react";
import { PropsChildrenParent } from "./PropsChildrenParent";
import { ExampleComponent } from "./ExampleComponent";

export default {
  title: "Spike/props.children",
  component: PropsChildrenParent,
} as ComponentMeta<typeof PropsChildrenParent>;

export const SinglePrimitiveChild = () => {
  return (
    <div>
      <p>I can slot a primitive value.</p>
      <PropsChildrenParent>Primitive (string)</PropsChildrenParent>
    </div>
  );
};

export const SingleHtmlElementChild = () => {
  return (
    <div>
      <p>I can slot an HTML element.</p>
      <PropsChildrenParent>
        <label>HTML element (label)</label>
      </PropsChildrenParent>
    </div>
  );
};

export const SingleJsxChild = () => {
  return (
    <div>
      <p>I can slot JSX.</p>
      <PropsChildrenParent>
        <ExampleComponent />
      </PropsChildrenParent>
    </div>
  );
};

export const SingleRenderFunctionChild = () => {
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
      <p>I can slot a render function.</p>
      <PropsChildrenParent>{renderChild()}</PropsChildrenParent>
    </div>
  );
};

export const SinglePropsChild = () => {
  return (
    <div>
      <p>
        'I can slot component props' isn't necessary for props.children, since
        the props are attributes on the component.
      </p>
      <PropsChildrenParent>
        <ExampleComponent description="This is a bus" />
      </PropsChildrenParent>
    </div>
  );
};

export const UpdateSingleChildProps = () => {
  return (
    <div>
      <p>I can modify the props of a child.</p>
      <PropsChildrenParent storyUpdateProps>
        <ExampleComponent description="Updated: This is a bus" />
      </PropsChildrenParent>
    </div>
  );
};

// export const SubscribeSingleChildCallback = () => {
//   return (
//     <div>
//       <p>I can subscribe to an callback (event) of a child.</p>
//       <PropsChildrenParent storyUpdateProps>
//         <ExampleComponent description="Updated: This is a bus" />
//       </PropsChildrenParent>
//     </div>
//   );
// };

// export const MultipleChildElements = () => {
//   return (
//     <div>
//       <p>
//         I can provide a primitive value as content within a container control.
//       </p>
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
//       <p>
//         I can provide a primitive value as content within a container control.
//       </p>
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
// //     <p>I can use props.children to transpose a single child.</p>
// //     <BasicParent title="Hello Child">
// //       <div>Single child</div>
// //     </BasicParent>
// //   </div>
// // );
