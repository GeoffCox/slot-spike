import * as React from "react";
import { ComponentProps, ObjectShorthandProps } from "../slots/types";

type Commons = {
  description?: string;
  onExampleClick?: () => void;
};

type Slots = {
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
};

export type ExampleComponentProps = ComponentProps<Slots> & Commons;
