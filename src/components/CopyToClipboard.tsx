/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { CopyIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";

export const CopyToClipboard = (props: any) => {
  return (
    <Box
      position="absolute"
      right="5px"
      top="5px"
      zIndex={1}
      bg="gray.700"
      border="1px solid silver"
      borderRadius="5px"
    >
      <Button
        onClick={() => void navigator.clipboard.writeText(props.children)}
      >
        <CopyIcon />
      </Button>
    </Box>
  );
};
