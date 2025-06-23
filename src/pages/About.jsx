import { Box, Heading, Text } from "@chakra-ui/react";
export default function About() {
  return (
    <Box p={6} maxW="lg" mx="auto" mt={10}>
      <Heading size="lg" mb={4}>
        ℹ️ About
      </Heading>
      <Text fontSize="md" color="gray.600">
        これは「アバウト」ページです。アプリの概要や紹介文などを書く場所に適しています。
      </Text>
    </Box>
  );
}
