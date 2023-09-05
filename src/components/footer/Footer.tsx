import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaTwitter, FaGithub } from "react-icons/fa";
import { SocialButton } from "@/components/footer/SocialButton";

export default function Footer() {
  return (
    <Box
      // bg={useColorModeValue('#00000f', '#1d1e20')}
      color={useColorModeValue("gray.700", "gray.200")}
      as="footer"
      p="1.25em"
      px="5%"
      mx={{ base: "2rem", md: "6rem", lg: "10rem" }}
    >
      <Container
        as={Stack}
        maxW={"2xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Stack direction={"row"} spacing={3}>
          <Link
            as={NextLink}
            href={
              "https://github.com/Developer-DAO/academy/issues/new?assignees=&labels=needs+triage%2C+bug&template=bug_report.md&title="
            }
            passHref
            isExternal
            textDecoration="underline"
          >
            Feedback
          </Link>
          <Link
            href={"/docs"}
            passHref
            as={NextLink}
            textDecoration="underline"
          >
            Contribute
          </Link>
        </Stack>
        <Stack direction={"row"} spacing={6}>
          <SocialButton
            label={"Twitter"}
            href={"https://twitter.com/devdao_academy"}
          >
            <FaTwitter />
          </SocialButton>
          <SocialButton
            label={"Github"}
            href={"https://github.com/developer-dao/academy"}
          >
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>

      <Container maxW={"6xl"} py={4} centerContent>
        <Text>Developer DAO Foundation © {new Date().getFullYear()}</Text>
        <Text align="center">
          Website content licensed under{" "}
          <Link
            as={NextLink}
            href={"http://creativecommons.org/licenses/by-nc/4.0/"}
            passHref
            isExternal
            textDecoration="underline"
          >
            CC BY-NC 4.0
          </Link>
          .
        </Text>
        <Text>
          Website code is licensed under{" "}
          <Link
            as={NextLink}
            href={"https://github.com/Developer-DAO/academy/blob/main/LICENSE"}
            passHref
            isExternal
            textDecoration="underline"
          >
            MIT
          </Link>
          .
        </Text>
        <Text>
          <Link
            as={NextLink}
            href={"https://www.developerdao.com/privacy-policy"}
            passHref
            isExternal
            textDecoration="underline"
          >
            Privacy Policy
          </Link>
        </Text>
      </Container>
    </Box>
  );
}
