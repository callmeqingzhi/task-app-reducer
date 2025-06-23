import { Box, Heading, Text, Icon } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";

export default function Home() {
  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={16}
      p={8}
      borderWidth="1px"
      borderRadius="xl"
      boxShadow="lg"
      bg="white"
      textAlign="center"
    >
      <Heading
        as="h1"
        size="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        mb={4}
      >
        <Icon as={FaHome} color="teal.500" boxSize={6} />
        ホームページ
      </Heading>
      <Text fontSize="md" color="gray.600">
        ようこそ！
      </Text>
    </Box>
  );
}
