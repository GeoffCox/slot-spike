import { group } from "console";
import React from "react";
import "./spike.css";

type StoryOptions = {
  // a slot name of a child to render before the other children, index number to reorder a primitive value
  storyMoveSlotFirst?: string;

  // a set of slot names to group
  storyGroupSlots?: string[];

  // a property name to read from the children, $ to read primitive value
  storyReadProp?: string;

  // a property name and callback to update a property
  storyUpdateProp?: {
    name: string;
    onUpdate: (value: any) => any;
  };

  // an event name and callback to handle the event
  storySubscribeEvent?: {
    name: string;
    onEvent: (event: any) => any;
  };
};

type Props = React.PropsWithChildren<StoryOptions>;

const isSingleChild = (children: any) => {
  if (!Array.isArray(children)) {
    return children?.type && children?.props;
  }
};

export const PropsChildrenParent = (props: Props) => {
  const {
    children,
    storyMoveSlotFirst,
    storyGroupSlots,
    storyReadProp,
    storyUpdateProp,
    storySubscribeEvent,
  } = props;

  console.log(storyGroupSlots);

  // ----- Hooks ----- //
  const [clickMessage, setClickMessage] = React.useState("");

  React.useEffect(() => {
    const clickTimeout = setTimeout(() => {
      setClickMessage("");
    }, 1000);

    return () => {
      clearTimeout(clickTimeout);
    };
  }, [clickMessage]);

  // ---- props.children read -----//

  let readProps: string[] = [];

  if (storyReadProp && storyReadProp.length > 0 && children) {
    if (Array.isArray(children)) {
      const anyChildren = children as any;
      anyChildren.forEach((child: any) => {
        if (isSingleChild(child)) {
          readProps.push(`Read from child: ${child.props[storyReadProp]}`);
        } else if (storyReadProp === "$") {
          readProps.push(`Read primitive from child: ${child}`);
        } else {
          readProps.push("Could not read from child. Child is not a component");
        }
      });
    } else if (isSingleChild(children)) {
      const singleChild = children as any;
      readProps.push(`Read from child: ${singleChild.props[storyReadProp]}`);
    } else if (storyReadProp === "$") {
      readProps.push(`Read primitive from child: ${children}`);
    } else {
      readProps.push(
        "Could not read from children. Children is not a component, primitive, or array"
      );
    }
  }

  // ---- props.children reordering -----//

  const orderChildren = (children: any[]): any[] => {
    if (storyMoveSlotFirst) {
      const newChildren = children.slice();
      let index = parseInt(storyMoveSlotFirst);
      if (!index) {
        index = children.findIndex(
          (child) => child.props["slot"] === storyMoveSlotFirst
        );
      }
      if (index !== -1 && index < children.length) {
        const child = children[index];
        newChildren.splice(index, 1);
        return [child, newChildren];
      }
    }
    return children;
  };

  // ----- props.children grouping ----- //
  const extractChildren = (parent: any, grouped: any[]): any => {
    if (parent?.props?.children) {
      if (Array.isArray(parent.props.children)) {
        const newChildren: any[] = [];

        parent.props.children.filter(Boolean).forEach((child: any) => {
          if (storyGroupSlots?.includes(child.props["slot"])) {
            grouped.push(child);
          } else {
            newChildren.push(extractChildren(child, grouped));
          }
        });

        return React.cloneElement(parent, { children: newChildren });
      } else if (isSingleChild(parent.props.children)) {
        return React.cloneElement(parent, {
          children: extractChildren(parent.props.children, grouped),
        });
      }
    }

    return parent;
  };

  const groupChildren = (parent: any): any => {
    if (storyGroupSlots && storyGroupSlots.length > 0) {
      const grouped: any[] = [];
      const newParent = extractChildren(parent, grouped);
      return (
        <div>
          <div>
            <label>**Grouped**</label>
            <div style={{ marginLeft: "10px", marginBottom: "10px" }}>
              {grouped}
            </div>
          </div>
          {newParent}
        </div>
      );
    }
    return parent;
  };

  const groupArrayOfChildren = (children: any[]): any[] => {
    if (storyGroupSlots && storyGroupSlots.length > 0) {
      const newChildren: any[] = [];
      const grouped: any[] = [];
      children.forEach((child) =>
        newChildren.push(extractChildren(child, grouped))
      );

      newChildren.unshift(
        <div>
          <label>**Grouped**</label>
          <div style={{ marginLeft: "10px", marginBottom: "10px" }}>
            {grouped}
          </div>
        </div>
      );

      return newChildren;
    }

    return children;
  };

  // ---- props.children update -----//

  const renderChild = (child: any, i?: number) => {
    if (isSingleChild(child)) {
      const updatedProps: any = {};

      if (storyUpdateProp) {
        updatedProps[storyUpdateProp.name] = storyUpdateProp.onUpdate(
          child.props[storyUpdateProp.name]
        );
      }

      if (storySubscribeEvent) {
        const originalEvent = child.props[storySubscribeEvent.name];
        updatedProps[storySubscribeEvent.name] = (e: any) => {
          storySubscribeEvent.onEvent(e);
          originalEvent && originalEvent();
        };
      }

      return React.cloneElement(child, updatedProps);
    } else if (storyUpdateProp?.name === "$") {
      return storyUpdateProp.onUpdate(child);
    }

    return <>{child}</>;
  };

  const renderChildren = () => {
    if (children && Array.isArray(children)) {
      const orderedChildren = orderChildren(children as any[]);
      const groupedChildren = groupArrayOfChildren(orderedChildren);
      return groupedChildren.map((child: any, i: number) =>
        renderChild(child, i)
      );
    }

    return renderChild(groupChildren(children));
  };

  // ---- render -----//
  return (
    <div className="parent">
      <div className="child">{renderChildren()}</div>
      {storyReadProp && (
        <div>
          <div>Property: {storyReadProp}</div>
          <div>
            {readProps.map((propValue, i, arr) => {
              return (
                <div>
                  {arr.length > 1 && `[${i}]`} {propValue}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div>{clickMessage}</div>
    </div>
  );
};
