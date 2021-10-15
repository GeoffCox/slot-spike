import React from "react";

export const useAutoClearString = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>
] => {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const clickTimeout = setTimeout(() => {
      setValue("");
    }, 1000);

    return () => {
      clearTimeout(clickTimeout);
    };
  }, [value]);

  return [value, setValue];
};
