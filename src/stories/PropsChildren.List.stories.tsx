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
  title: "Spike/props.children/list",
  component: PropsChildrenParent,
} as ComponentMeta<typeof PropsChildrenParent>;

export const SlotContent = () => {
  return (
    <div>
      <div>
        <h3>I can slot primitive values.</h3>
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
        <h3>I can slot HTML elements.</h3>
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
        <h3>I can slot components (JSX).</h3>
        <PropsChildrenParent>
          <PlaneComponent description="This is a plane" />
          <TrainComponent description="This is a train" />
          <AutomobileComponent description="This is an automobile" />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can slot a render function.</h3>
        <PropsChildrenParent>
          {renderPlane({ description: "This is a plane" })}
          {renderTrain({ description: "This is a train" })}
          {renderAutomobile({ description: "This is an automobile" })}
        </PropsChildrenParent>
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

export const NamedSlots = () => {
  return (
    <div>
      <div>
        <h3>I can reorder primitive values based on position.</h3>
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
        <h3>I can reorder HTML elements with a named slot.</h3>
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
        <h3>I can reorder components (JSX) with a named slot.</h3>
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
        <h3>I can reorder render functions with a named slot.</h3>
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
        <h3>I can slot component props.</h3>
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
        <h3>I can read the props of a primitive value</h3>
        <PropsChildrenParent storyReadProp="$">
          This is a plane (string)
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can read the props of HTML elements.</h3>
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
        <h3>I can read the props of components (JSX).</h3>
        <PropsChildrenParent storyReadProp="description">
          <PlaneComponent description="This is a plane" />
          <TrainComponent description="This is a train" />
          <AutomobileComponent description="This is an automobile" />
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can read the props of a render function.</h3>
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
        <h3>I can read the slotted component props.</h3>
        <p style={{ color: "green" }}>
          This is N/A for the props.children approach.
        </p>
      </div>
    </div>
  );
};
