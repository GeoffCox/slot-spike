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

  const readChildProps = (children: any, index: number, depth: number) => {
    if (storyReadProp && storyReadProp.length > 0) {
      if (Array.isArray(children)) {
        const anyChildren = children as any[];
        anyChildren.forEach((child: any, i: number) => {
          readChildProps(child, i, depth);
        });
      } else if (isSingleChild(children)) {
        const singleChild = children as any;

        if (singleChild.props[storyReadProp]) {
          readProps.push(
            `${"_".repeat(depth ?? 0)}[${index}]: ${
              singleChild.props[storyReadProp]
            }`
          );
        }
        if (singleChild.props?.children) {
          readChildProps(singleChild.props?.children, index, depth + 1);
        }
      } else if (storyReadProp === "$") {
        readProps.push(`${"_".repeat(depth ?? 0)}[${index}]: ${children}`);
      }
    }
  };

  readChildProps(children, 0, 0);

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

  const updateProps = (parent: any): any => {
    if (storyUpdateProp && isSingleChild(parent)) {
      let updatedProps: any = {};

      if (parent.props && parent.props[storyUpdateProp.name]) {
        updatedProps[storyUpdateProp.name] = storyUpdateProp.onUpdate(
          parent.props[storyUpdateProp.name]
        );
      }

      if (parent.props.children) {
        if (Array.isArray(parent.props.children)) {
          updatedProps.children = parent.props.children
            .filter(Boolean)
            .map((child: any) => updateProps(child));
        } else if (isSingleChild(parent.props.children)) {
          updatedProps.children = updateProps(parent.props.children);
        }
      }

      return React.cloneElement(parent, updatedProps);
    } else if (storyUpdateProp?.name === "$") {
      return storyUpdateProp.onUpdate(parent);
    }

    return parent;
  };

  const subscribeToEvents = (parent: any): any => {
    if (storySubscribeEvent && parent?.props) {
      let updatedProps: any = {};

      const originalEvent = parent.props[storySubscribeEvent.name];
      updatedProps[storySubscribeEvent.name] = (e: any) => {
        storySubscribeEvent.onEvent(e);
        originalEvent && originalEvent();
      };

      if (parent.props.children && Array.isArray(parent.props.children)) {
        updatedProps.children = parent.props.children
          .filter(Boolean)
          .map((child: any) => subscribeToEvents(child));
      }

      return React.cloneElement(parent, updatedProps);
    }

    return parent;
  };

  // ---- render -----//

  const renderChildren = () => {
    if (children) {
      if (Array.isArray(children)) {
        let updatedChildren = orderChildren(children as any[]);
        updatedChildren = groupArrayOfChildren(updatedChildren);
        updatedChildren = updatedChildren.map(updateProps);
        updatedChildren = updatedChildren.map(subscribeToEvents);

        return <>{updatedChildren}</>;
      } else {
        let updatedChildren = groupChildren(children as any);
        updatedChildren = updateProps(updatedChildren);
        updatedChildren = subscribeToEvents(updatedChildren);
        return <>{updatedChildren}</>;
      }
    }
  };

  return (
    <div className="parent">
      <div className="child">{renderChildren()}</div>
      {storyReadProp && (
        <div>
          <div>Property: {storyReadProp}</div>
          <div>
            {readProps.map((propValue) => {
              return <div>{propValue}</div>;
            })}
          </div>
        </div>
      )}
      <div>{clickMessage}</div>
    </div>
  );
};
