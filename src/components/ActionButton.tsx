import { Button, useColorModeValue } from "@chakra-ui/react";

export const ActionButton = ({
  label,
  href,
}: {
  label: string;
  href: string;
}) => {
  return (
    <Button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      border="0.5px solid gray"
      cursor={"pointer"}
      as={"a"}
      p="2"
      href={href}
      display={"inline-flex"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      {label}
    </Button>
  );
};
