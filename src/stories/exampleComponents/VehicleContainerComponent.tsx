import * as React from "react";
import { ExampleComponentProps } from "./ExampleComponentProps";

export const VehicleContainerComponent: React.FC<
  React.PropsWithChildren<ExampleComponentProps>
> = (props) => {
  const { description, onExampleClick, children } = props;

  return (
    <div
      className="example-component"
      onClick={() => onExampleClick && onExampleClick()}
    >
      {description && <div>{description}</div>}
      <div style={{ marginLeft: "10px" }}>{children}</div>
    </div>
  );
};
