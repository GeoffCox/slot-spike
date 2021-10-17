import * as React from "react";

type Props = {
  title?: string;
  description: string;
  slot?: string;
  [key: string]: any;
};

export const renderPlane = ({ title, description, slot }: Props) => {
  return (
    <div className="example-component" title={title} slot={slot}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2048 2048"
        focusable="false"
      >
        <path d="M1792 768q52 0 99 20t81 55 55 82 21 99q0 53-20 99t-55 81-82 55-99 21h-448l-384 768H512l256-768H512l-64 128H0l128-384L0 640h448l64 128h256L512 0h448l384 768h448zm0 384q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10h-527q-99-192-193-383T881 128H690q64 193 127 384t129 384H433l-64-128H178q21 64 41 128t44 128q-23 64-43 128t-42 128h191l64-128h513q-66 192-129 383t-127 385h191q97-193 191-384t193-384h527z" />
      </svg>
      {description && <div>{description}</div>}
    </div>
  );
};

export const renderTrain = ({ title, description, slot }: Props) => {
  return (
    <div className="example-component" title={title} slot={slot}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2048 2048"
        focusable="false"
      >
        <path d="M576 1536q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zm896 0q-26 0-45-19t-19-45q0-26 19-45t45-19q26 0 45 19t19 45q0 26-19 45t-45 19zM1280 384H768V256h512v128zm165 1408H603l-256 256H165l258-258q-35-4-65-21t-53-42-36-58-13-69V192q0-40 15-75t41-61 61-41 75-15h1152q40 0 75 15t61 41 41 61 15 75v1408q0 36-13 68t-35 58-53 43-66 21l258 258h-182l-256-256zm219-1152H384v512h1280V640zM448 128q-26 0-45 19t-19 45v320h1280V192q0-26-19-45t-45-19H448zm-64 1472q0 26 19 45t45 19h1152q26 0 45-19t19-45v-320H384v320z" />
      </svg>
      {description && <div>{description}</div>}
    </div>
  );
};

export const renderAutomobile = ({ title, description, slot }: Props) => {
  return (
    <div className="example-component" title={title} slot={slot}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2048 2048"
        focusable="false"
      >
        <path d="M384 1152q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm1280 0q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10zm347-256l-66 65q2 5 10 30t19 59 25 73 24 71 18 54 7 22v650q0 27-10 50t-27 40-41 28-50 10h-128q-27 0-50-10t-40-27-28-41-10-50H384q0 27-10 50t-27 40-41 28-50 10H128q-27 0-50-10t-40-27-28-41-10-50v-650l7-21 18-54 24-72q13-39 24-73t20-59 10-30l-66-65H0V768h91l57 58 74-223q16-49 46-89t71-69 87-45 100-16h996q52 0 99 16t88 44 70 69 47 90l74 223 57-58h91v128h-37zM526 512q-63 0-112 36t-70 95l-85 253h1530l-85-253q-20-59-69-95t-113-36H526zm882 1231l-104-207H744l-104 207v49h768v-49zm512 49v-502l-6-18q-6-18-15-47t-21-61-21-63-17-51-9-26H217q-2 5-9 26t-17 50-21 63-20 62-16 46-6 19v502h384v-79l152-305h720l152 305v79h384z" />
      </svg>
      {description && <div>{description}</div>}
    </div>
  );
};
