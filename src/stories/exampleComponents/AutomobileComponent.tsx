import * as React from "react";
import { ExampleComponentProps } from "./ExampleComponentProps";

export const AutomobileComponent: React.FC<ExampleComponentProps> = (props) => {
  const { description, onExampleClick } = props;

  return (
    <div
      className="example-component"
      onClick={() => onExampleClick && onExampleClick()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2048 2048"
        focusable="false"
      >
        <path d="M384 1152q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm1280 0q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm347-256l-66 65q2 5 10 30t19 59 25 73 24 71 18 54 7 22v650q0 27-10 50t-27 40-41 28-50 10h-128q-27 0-50-10t-40-27-28-41-10-50H384q0 27-10 50t-27 40-41 28-50 10H128q-27 0-50-10t-40-27-28-41-10-50v-650l7-21 18-54 24-72q13-39 24-73t20-59 10-30l-66-65H0V768h91l57 58 74-223q16-49 46-89t71-69 87-45 100-16h996q52 0 99 16t88 44 70 69 47 90l74 223 57-58h91v128h-37zM526 512q-63 0-112 36t-70 95l-85 253h1530l-85-253q-20-59-69-95t-113-36H526zm882 1231l-104-207H744l-104 207v49h768v-49zm512 49v-502l-6-18q-6-18-15-47t-21-61-21-63-17-51-9-26H217q-2 5-9 26t-17 50-21 63-20 62-16 46-6 19v502h384v-79l152-305h720l152 305v79h384z" />
      </svg>
      {description && <span style={{ marginLeft: "5px" }}>{description}</span>}
    </div>
  );
};
