import { Box } from "@twilio-paste/box";
import { Flex, Spinner } from "@twilio-paste/core";

import { FC } from "react";

export type PlaceholderProps = {
  loading: boolean;
};

const Placeholder: FC<PlaceholderProps> = (props) => {
  return (
    <Box
      width={"300px"}
      height={"300px"}
      backgroundColor={"colorBackgroundDecorative10Weakest"}
    >
      <Flex
        hAlignContent={"center"}
        vAlignContent={"center"}
        padding={"space190"}
      >
        <Flex hAlignContent={"center"} vAlignContent={"center"} grow>
          {props.loading && <Spinner decorative={true} size={"sizeIcon110"} />}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Placeholder;
