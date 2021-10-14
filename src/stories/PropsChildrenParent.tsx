import React from "react";
import "./spike.css";

type StoryOptions = {
  storyReadProps?: boolean;
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
  const {
    children,
    storyReadProps,
    storyUpdateProps,
    storyHandleClick,
  } = props;

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

  let descriptions: string[] = [];

  if (storyReadProps && children) {
    if (Array.isArray(children)) {
      const anyChildren = children as any;
      anyChildren.forEach((child: any) =>
        descriptions.push(`Read from child: ${child.props.description}`)
      );
    } else if (isChildComponent(children)) {
      const singleChild = children as any;
      descriptions.push(`Read from child: ${singleChild.props.description}`);
    }
  }

  // ---- props.children update -----//

  const renderChild = (child: any, i?: number) => {
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
      {descriptions.map((description) => {
        return <div>{description}</div>;
      })}
      <div>{clickMessage}</div>
    </div>
  );
};
