import React from "react";
import { ComponentMeta } from "@storybook/react";
import { PropsChildrenParent } from "./PropsChildrenParent";
import { PlaneComponent } from "./exampleComponents/PlaneComponent";
import { TrainComponent } from "./exampleComponents/TrainComponent";
import { AutomobileComponent } from "./exampleComponents/AutomobileComponent";
import { useAutoClearString } from "./useAutoClearString";
import {
  renderAutomobile,
  renderPlane,
  renderTrain,
} from "./exampleComponents/renderVehicles";

export default {
  title: "Spike/props.children/2-list",
  component: PropsChildrenParent,
} as ComponentMeta<typeof PropsChildrenParent>;

export const SlotContent = () => {
  return (
    <div>
      <div>
        <h3>I can slot a list primitive values</h3>
        <PropsChildrenParent>
          {[
            "This is a plane (string)",
            " | ",
            "This is a train (string)",
            " | ",
            "This is an automobile (string)",
          ]}
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can slot a list HTML elements</h3>
        <PropsChildrenParent>
          <label style={{ display: "block" }}>This is a plane (label)</label>
          <div>-----</div>
          <label style={{ display: "block" }}>This is a train (label)</label>
          <div>-----</div>
          <label style={{ display: "block" }}>
            This is an automobile (label)
          </label>
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can slot a list components (JSX)</h3>
        <PropsChildrenParent>
          <PlaneComponent description="This is a plane" />
          <TrainComponent description="This is a train" />
          <AutomobileComponent description="This is an automobile" />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can slot a list render functions</h3>
        <PropsChildrenParent>
          {renderPlane({ description: "This is a plane" })}
          {renderTrain({ description: "This is a train" })}
          {renderAutomobile({ description: "This is an automobile" })}
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

export const NamedSlots = () => {
  return (
    <div>
      <div>
        <h3>I can reorder a list of primitive values based on position</h3>
        <p style={{ color: "green" }}>
          This moves the 5th element to be first.
        </p>
        <PropsChildrenParent storyMoveSlotFirst="4">
          {[
            " | ",
            "This is a plane (string)",
            " | ",
            "This is a train (string)",
            "This is an automobile (string)",
          ]}
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can reorder a list of HTML elements with a named slot</h3>
        <p style={{ color: "green" }}>
          This moves the element with slot="automobile" to be first.
        </p>
        <PropsChildrenParent storyMoveSlotFirst="automobile">
          <div>-----</div>
          <label style={{ display: "block" }}>This is a plane (label)</label>
          <div>-----</div>
          <label style={{ display: "block" }}>This is a train (label)</label>
          <label slot="automobile" style={{ display: "block" }}>
            This is an automobile (label)
          </label>
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can reorder a list of components (JSX) with a named slot</h3>
        <p style={{ color: "green" }}>
          This moves the component with slot="automobile" to be first.
        </p>
        <PropsChildrenParent storyMoveSlotFirst="automobile">
          <PlaneComponent description="This is a plane" />
          <TrainComponent description="This is a train" />
          <AutomobileComponent
            slot="automobile"
            description="This is an automobile"
          />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can reorder a list of render functions with a named slot</h3>
        <p style={{ color: "green" }}>
          This moves the component with slot="automobile" to be first.
        </p>
        <PropsChildrenParent storyMoveSlotFirst="automobile">
          {renderPlane({ description: "This is a plane", slot: "plane" })}
          {renderTrain({ description: "This is a train", slot: "train" })}
          {renderAutomobile({
            description: "This is an automobile",
            slot: "automobile",
          })}
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can reorder a list of component props</h3>
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
        <h3>I can read a list of primitive values</h3>
        <PropsChildrenParent storyReadProp="$">
          {[
            "This is a plane (string)",
            " | ",
            "This is a train (string)",
            " | ",
            "This is an automobile (string)",
          ]}
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can read the props of a list of HTML elements</h3>
        <PropsChildrenParent storyReadProp="defaultValue">
          <input
            type="text"
            defaultValue="This is a plane (input)"
            style={{ display: "block" }}
          />
          <input
            type="text"
            defaultValue="This is a train (input)"
            style={{ display: "block" }}
          />
          <input
            type="text"
            defaultValue="This is an automobile (input)"
            style={{ display: "block" }}
          />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can read the props of a list of components (JSX)</h3>
        <PropsChildrenParent storyReadProp="description">
          <PlaneComponent description="This is a plane" />
          <TrainComponent description="This is a train" />
          <AutomobileComponent description="This is an automobile" />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can read the props of a list of render functions</h3>
        <p style={{ color: "green" }}>
          For props.children, this reads the props of the root element, not the
          props passed to the function.
        </p>
        <PropsChildrenParent storyReadProp="title">
          {renderPlane({
            title: "This is a plane",
            description: "Hover for the tooltip",
          })}
          {renderTrain({
            title: "This is a plane",
            description: "Hover for the tooltip",
          })}
          {renderAutomobile({
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
        <h3>I can modify a list of primitive values</h3>
        <PropsChildrenParent
          storyUpdateProp={{
            name: "$",
            onUpdate: (value: any) => `Updated: ${value}`,
          }}
        >
          {[
            "This is a plane (string)",
            " | ",
            "This is a train (string)",
            " | ",
            "This is an automobile (string)",
          ]}
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can modify props of a list of HTML elements</h3>
        <PropsChildrenParent
          storyUpdateProp={{
            name: "defaultValue",
            onUpdate: (value: any) => `Updated: ${value}`,
          }}
        >
          <input
            type="text"
            defaultValue="This is a plane (input)"
            style={{ display: "block" }}
          />
          <input
            type="text"
            defaultValue="This is a train (input)"
            style={{ display: "block" }}
          />
          <input
            type="text"
            defaultValue="This is an automobile (input)"
            style={{ display: "block" }}
          />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can modify props of a list of components (JSX)</h3>
        <PropsChildrenParent
          storyUpdateProp={{
            name: "description",
            onUpdate: (value: any) => `Updated: ${value}`,
          }}
        >
          <PlaneComponent description="This is a plane" />
          <TrainComponent description="This is a train" />
          <AutomobileComponent description="This is an automobile" />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can modify the props of a list of render functions</h3>
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
          {renderTrain({
            title: "This is a plane",
            description: "Hover for the tooltip",
          })}
          {renderAutomobile({
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
  const [
    htmlElementChildMessage,
    setHtmlElementChildMessage,
  ] = useAutoClearString();
  const [jsxMessage, setJsxMessage] = useAutoClearString();
  const [jsxChildMessage, setJsxChildMessage] = useAutoClearString();
  const [renderMessage, setRenderMessage] = useAutoClearString();
  const [renderChildMessage, setRenderChildMessage] = useAutoClearString();

  const renderPlaneWithOnClick = (): React.ReactNode => {
    return (
      <div onClick={() => setRenderChildMessage("Plane Clicked!")}>
        {renderPlane({ description: "This is a plane" })}
      </div>
    );
  };

  const renderTrainWithOnClick = (): React.ReactNode => {
    return (
      <div onClick={() => setRenderChildMessage("Train Clicked!")}>
        {renderTrain({ description: "This is a train" })}
      </div>
    );
  };

  const renderAutomobileWithOnClick = (): React.ReactNode => {
    return (
      <div onClick={() => setRenderChildMessage("Automobile Clicked!")}>
        {renderAutomobile({ description: "This is an automobile" })}
      </div>
    );
  };

  return (
    <div>
      <div>
        <h3>I can wrap an event on a list of primitive values</h3>
        <p style={{ color: "green" }}>
          This is N/A. Primitive values do not have any events.
        </p>
      </div>
      <div>
        <h3>I can wrap an event (onChange) on a list of HTML elements</h3>
        <PropsChildrenParent
          storySubscribeEvent={{
            name: "onChange",
            onEvent: (value: any) => setHtmlElementMessage("Changed!"),
          }}
        >
          <input
            type="text"
            defaultValue="This is a plane (input)"
            onChange={() => setHtmlElementChildMessage("Plane Changed!")}
            style={{ display: "block" }}
          />
          <input
            type="text"
            defaultValue="This is a train (input)"
            onChange={() => setHtmlElementChildMessage("Train Changed!")}
            style={{ display: "block" }}
          />
          <input
            type="text"
            defaultValue="This is an automobile (input)"
            onChange={() => setHtmlElementChildMessage("Automobile Changed!")}
            style={{ display: "block" }}
          />
        </PropsChildrenParent>
        <div>{htmlElementMessage}</div>
        <div>{htmlElementChildMessage}</div>
      </div>
      <div>
        <h3>
          I can wrap an event (onExampleClick) on a list of components (JSX)
        </h3>
        <PropsChildrenParent
          storySubscribeEvent={{
            name: "onExampleClick",
            onEvent: (value: any) => setJsxMessage("Clicked!"),
          }}
        >
          <PlaneComponent
            description="This is a plane"
            onExampleClick={() => setJsxChildMessage("Plane clicked!")}
          />
          <TrainComponent
            description="This is a plane"
            onExampleClick={() => setJsxChildMessage("Train clicked!")}
          />
          <AutomobileComponent
            description="This is a plane"
            onExampleClick={() => setJsxChildMessage("Automobile clicked!")}
          />
        </PropsChildrenParent>
        <div>{jsxMessage}</div>
        <div>{jsxChildMessage}</div>
      </div>
      <div>
        <h3>I can wrap an event (onClick) on render functions</h3>
        <PropsChildrenParent
          storySubscribeEvent={{
            name: "onClick",
            onEvent: (value: any) => setRenderMessage("Clicked!"),
          }}
        >
          {renderPlaneWithOnClick()}
          {renderTrainWithOnClick()}
          {renderAutomobileWithOnClick()}
        </PropsChildrenParent>
        <div>{renderMessage}</div>
        <div>{renderChildMessage}</div>
      </div>
    </div>
  );
};
