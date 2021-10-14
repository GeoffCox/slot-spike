import React, { ReactElement } from "react";
import "./spike.css";

type StoryOptions = {
  storyUpdateProps?: boolean;
};

type Props = React.PropsWithChildren<StoryOptions>;

export const PropsChildrenParent = (props: Props) => {
  // const renderInfo = (children: any) => {
  //   if (Array.isArray(children)) {
  //     return children.map((child, i) => {
  //       const anyChild = child as any;
  //       return (
  //         <div>
  //           <div>{i}</div>
  //           <div className="child-info-props">
  //             <div> type: {anyChild?.type}</div>
  //             <div> key: {anyChild?.key}</div>
  //             <div> ref: {anyChild?.ref ? "yes" : "no"}</div>
  //             {anyChild?.props?.children && renderInfo(anyChild.props.children)}
  //           </div>
  //         </div>
  //       );
  //     });
  //   }
  // };

  const { children, storyUpdateProps } = props;

  const renderChildren = () => {
    if (storyUpdateProps && children && Array.isArray(children)) {
      return (children as any).map((child: any) =>
        React.cloneElement(child, {
          description: `Updated: ${child.props.description}`,
        })
      );
    } else {
      return <>{children}</>;
    }
  };

  return (
    <div className="parent">
      <div>props.children</div>
      <div className="child">{renderChildren()}</div>
    </div>
  );
};
