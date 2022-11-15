import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { StyledSpinnerNext } from "baseui/spinner";
import React, { Suspense } from "react";

type TimelineContainerProps = {
  children?: React.ReactNode;
};

export function TimelineContainer({ children }: TimelineContainerProps) {
  const [css, theme] = useStyletron();
  return (
    <Block
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"25vh"}
      minHeight={"200px"}
      className={css({
        fontFamily: theme.typography.ParagraphMedium.fontFamily,
        userSelect: "none",
      })}
    >
      <Suspense fallback={<StyledSpinnerNext />}>{children}</Suspense>
    </Block>
  );
}
