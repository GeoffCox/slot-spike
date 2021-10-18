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
  renderVehicleContainer,
} from "./exampleComponents/renderVehicles";
import { VehicleContainerComponent } from "./exampleComponents/VehicleContainerComponent";

export default {
  title: "Spike/props.children/3-hierarchy",
  component: PropsChildrenParent,
} as ComponentMeta<typeof PropsChildrenParent>;

export const SlotContent = () => {
  return (
    <div>
      <div>
        <h3>I can slot a hierarchy of primitive values</h3>
        <p style={{ color: "green" }}>
          This is N/A since primitives don't have children.
        </p>
      </div>
      <div>
        <h3>I can slot a hierarchy HTML elements</h3>
        <PropsChildrenParent>
          <div>
            <div>
              <label>Planes</label>
              <div style={{ marginLeft: "10px" }}>
                <label style={{ display: "block" }}>
                  This is plane 1 (label)
                </label>
                <label style={{ display: "block" }}>
                  This is plane 2 (label)
                </label>
              </div>
            </div>
            <div>
              <label>Trains</label>
              <div style={{ marginLeft: "10px" }}>
                <label style={{ display: "block" }}>
                  This is train 1 (label)
                </label>
                <div style={{ marginLeft: "10px" }}>
                  <label style={{ display: "block" }}>
                    This is train 1-A (label)
                  </label>
                  <label style={{ display: "block" }}>
                    This is train 1-B (label)
                  </label>
                  <div style={{ marginLeft: "10px" }}>
                    <label style={{ display: "block" }}>
                      This is train 1-B-A (label)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label>Automobiles</label>
              <div style={{ marginLeft: "10px" }}>
                <div>
                  <label>Classic</label>
                  <div style={{ marginLeft: "10px" }}>
                    <label style={{ display: "block" }}>
                      This is automobile 1 (label)
                    </label>
                  </div>
                </div>
                <div>
                  <label>Modern</label>
                  <div style={{ marginLeft: "10px" }}>
                    <label style={{ display: "block" }}>
                      This is automobile 2 (label)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can slot a hierarchy of components (JSX)</h3>
        <PropsChildrenParent>
          <VehicleContainerComponent description="Planes">
            <PlaneComponent description="This is plane 1" />
            <PlaneComponent description="This is plane 2" />
          </VehicleContainerComponent>
          <VehicleContainerComponent description="Trains">
            <TrainComponent description="This is train 1" />
            <VehicleContainerComponent>
              <TrainComponent description="This is train 1-A" />
              <TrainComponent description="This is train 1-B" />
              <VehicleContainerComponent>
                <TrainComponent description="This is train 1-B-A" />
              </VehicleContainerComponent>
            </VehicleContainerComponent>
          </VehicleContainerComponent>
          <VehicleContainerComponent description="Automobiles">
            <VehicleContainerComponent description="Classic">
              <AutomobileComponent description="This is automobile 1" />
            </VehicleContainerComponent>
            <VehicleContainerComponent description="Modern">
              <AutomobileComponent description="This is automobile 2" />
            </VehicleContainerComponent>
          </VehicleContainerComponent>
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can slot a hierarchy of render functions</h3>
        <PropsChildrenParent>
          {renderVehicleContainer({
            description: "Planes",
            renderChild: () => {
              return (
                <>
                  {renderPlane({ description: "This is plane 1" })}
                  {renderPlane({ description: "This is plane 2" })}
                </>
              );
            },
          })}
          {renderVehicleContainer({
            description: "Trains",
            renderChild: () => {
              return (
                <>
                  {renderVehicleContainer({
                    renderChild: () => {
                      return (
                        <>
                          {renderTrain({ description: "This is train 1" })}
                          {renderVehicleContainer({
                            renderChild: () => {
                              return (
                                <>
                                  {renderTrain({
                                    description: "This is train 1-A",
                                  })}
                                  {renderTrain({
                                    description: "This is train 1-B",
                                  })}
                                  {renderVehicleContainer({
                                    renderChild: () => {
                                      return (
                                        <>
                                          {renderTrain({
                                            description: "This is train 1-B-A",
                                          })}
                                        </>
                                      );
                                    },
                                  })}
                                </>
                              );
                            },
                          })}
                        </>
                      );
                    },
                  })}
                </>
              );
            },
          })}
          {renderVehicleContainer({
            description: "Automobiles",
            renderChild: () => {
              return (
                <>
                  {renderVehicleContainer({
                    description: "Classic",
                    renderChild: () => {
                      return (
                        <>
                          {renderAutomobile({
                            description: "This is automobile 1",
                          })}
                        </>
                      );
                    },
                  })}
                  {renderVehicleContainer({
                    description: "Modern",
                    renderChild: () => {
                      return (
                        <>
                          {renderAutomobile({
                            description: "This is automobile 2",
                          })}
                        </>
                      );
                    },
                  })}
                </>
              );
            },
          })}
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
        <h3>I can extract and group primitive values from a hierarchy</h3>
        <p style={{ color: "green" }}>
          This is N/A since primitives don't have children.
        </p>
      </div>
      <div>
        <h3>I can extract and group HTML elements from a hierarchy</h3>
        <p style={{ color: "green" }}>
          This groups the elements with slots=["plane2","train1B",
          "classicAutos"].
        </p>
        <PropsChildrenParent
          storyGroupSlots={["plane2", "train1B", "classicAutos"]}
        >
          <div>
            <div>
              <label>Planes</label>
              <div style={{ marginLeft: "10px" }}>
                <label style={{ display: "block" }}>
                  This is plane 1 (label)
                </label>
                <label style={{ display: "block" }} slot="plane2">
                  This is plane 2 (label)
                </label>
              </div>
            </div>
            <div>
              <label>Trains</label>
              <div style={{ marginLeft: "10px" }}>
                <label style={{ display: "block" }}>
                  This is train 1 (label)
                </label>
                <div style={{ marginLeft: "10px" }}>
                  <label style={{ display: "block" }}>
                    This is train 1-A (label)
                  </label>
                  <label style={{ display: "block" }} slot="train1B">
                    This is train 1-B (label)
                  </label>
                  <div style={{ marginLeft: "10px" }}>
                    <label style={{ display: "block" }}>
                      This is train 1-B-A (label)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label>Automobiles</label>
              <div style={{ marginLeft: "10px" }}>
                <div slot="classicAutos">
                  <label>Classic</label>
                  <div style={{ marginLeft: "10px" }}>
                    <label style={{ display: "block" }}>
                      This is automobile 1 (label)
                    </label>
                  </div>
                </div>
                <div>
                  <label>Modern</label>
                  <div style={{ marginLeft: "10px" }}>
                    <label style={{ display: "block" }}>
                      This is automobile 2 (label)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can extract and group components (JSX) from a hierarchy</h3>
        <p style={{ color: "green" }}>
          This groups the elements with slots=["plane2","train1B",
          "classicAutos"].
        </p>
        <PropsChildrenParent
          storyGroupSlots={["plane2", "train1B", "classicAutos"]}
        >
          <VehicleContainerComponent description="Planes">
            <PlaneComponent description="This is plane 1" />
            <PlaneComponent description="This is plane 2" slot="plane2" />
          </VehicleContainerComponent>
          <VehicleContainerComponent description="Trains">
            <TrainComponent description="This is train 1" />
            <VehicleContainerComponent>
              <TrainComponent description="This is train 1-A" />
              <TrainComponent description="This is train 1-B" slot="train1B" />
              <VehicleContainerComponent>
                <TrainComponent description="This is train 1-B-A" />
              </VehicleContainerComponent>
            </VehicleContainerComponent>
          </VehicleContainerComponent>
          <VehicleContainerComponent description="Automobiles">
            <VehicleContainerComponent
              description="Classic"
              slot="classicAutos"
            >
              <AutomobileComponent description="This is automobile 1" />
            </VehicleContainerComponent>
            <VehicleContainerComponent description="Modern">
              <AutomobileComponent description="This is automobile 2" />
            </VehicleContainerComponent>
          </VehicleContainerComponent>
        </PropsChildrenParent>
      </div>
      <div>
        <h3>I can extract and group render functions from a hierarchy</h3>
        <PropsChildrenParent
          storyGroupSlots={["plane2", "train1B", "classicAutos"]}
        >
          {renderVehicleContainer({
            description: "Planes",
            renderChild: () => {
              return (
                <>
                  {renderPlane({ description: "This is plane 1" })}
                  {renderPlane({
                    description: "This is plane 2",
                    slot: "plane2",
                  })}
                </>
              );
            },
          })}
          {renderVehicleContainer({
            description: "Trains",
            renderChild: () => {
              return (
                <>
                  {renderVehicleContainer({
                    renderChild: () => {
                      return (
                        <>
                          {renderTrain({ description: "This is train 1" })}
                          {renderVehicleContainer({
                            renderChild: () => {
                              return (
                                <>
                                  {renderTrain({
                                    description: "This is train 1-A",
                                  })}
                                  {renderTrain({
                                    description: "This is train 1-B",
                                    slot: "train1B",
                                  })}
                                  {renderVehicleContainer({
                                    renderChild: () => {
                                      return (
                                        <>
                                          {renderTrain({
                                            description: "This is train 1-B-A",
                                          })}
                                        </>
                                      );
                                    },
                                  })}
                                </>
                              );
                            },
                          })}
                        </>
                      );
                    },
                  })}
                </>
              );
            },
          })}
          {renderVehicleContainer({
            description: "Automobiles",
            renderChild: () => {
              return (
                <>
                  {renderVehicleContainer({
                    description: "Classic",
                    slot: "classicAutos",
                    renderChild: () => {
                      return (
                        <>
                          {renderAutomobile({
                            description: "This is automobile 1",
                          })}
                        </>
                      );
                    },
                  })}
                  {renderVehicleContainer({
                    description: "Modern",
                    renderChild: () => {
                      return (
                        <>
                          {renderAutomobile({
                            description: "This is automobile 2",
                          })}
                        </>
                      );
                    },
                  })}
                </>
              );
            },
          })}
        </PropsChildrenParent>
      </div>
    </div>
  );
};
