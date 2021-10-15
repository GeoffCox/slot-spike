import React from "react";
import "./spike.css";

type StoryOptions = {
  // a property name to read from the children, $ to read primitive value
  storyReadProp?: string;
  storyUpdateProps?: boolean;
  storyHandleClick?: boolean;
};

type Props = React.PropsWithChildren<StoryOptions>;

const isChildComponent = (children: any) => {
  if (!Array.isArray(children)) {
    return children?.type && children?.props;
  }
};

export const PropsChildrenParent = (props: Props) => {
  const { children, storyReadProp, storyUpdateProps, storyHandleClick } = props;

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
        if (isChildComponent(child)) {
          readProps.push(`Read from child: ${child.props[storyReadProp]}`);
        } else if (storyReadProp === "$") {
          readProps.push(`Read primitive from child: ${child}`);
        } else {
          readProps.push("Could not read from child. Child is not a component");
        }
      });
    } else if (isChildComponent(children)) {
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

  // ---- props.children update -----//

  const renderChild = (child: any, i?: number) => {
    if (isChildComponent(child)) {
      const updatedProps: any = {};

      const indexText = i ? `[${i}] ` : "";

      if (storyUpdateProps) {
        updatedProps.description = `${indexText}Updated: ${child.props.description}`;
      }

      if (storyHandleClick) {
        const onClick = child.props.onExampleClick;
        updatedProps.onExampleClick = () => {
          setClickMessage(`${indexText}Clicked!`);
          onClick && onClick();
        };
      }

      return React.cloneElement(child, updatedProps);
    }

    return child;
  };

  const renderChildren = () => {
    if (children && Array.isArray(children)) {
      const anyChildren = children as any;
      return anyChildren.map((child: any, i: number) => renderChild(child, i));
    }
    if (children && isChildComponent(children)) {
      return renderChild(children);
    }

    return <>{children}</>;
  };

  // ---- render -----//
  return (
    <div className="parent">
      <div className="child">{renderChildren()}</div>
      {storyReadProp && (
        <div>
          <div>Property: {storyReadProp}</div>
          <div>
            {readProps.map((description) => {
              return <div>{description}</div>;
            })}
          </div>
        </div>
      )}
      <div>{clickMessage}</div>
    </div>
  );
};
