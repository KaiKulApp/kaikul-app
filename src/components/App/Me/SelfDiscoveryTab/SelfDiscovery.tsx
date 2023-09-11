import { Text, VStack, Grid } from "@chakra-ui/react";
import React, { useState } from "react";
import { UserProfileAddition } from "@/atoms/userProfileAdditionAtom";
import { InfoIcon } from "@chakra-ui/icons";
import SelfDiscoveryModal from "@/components/Modal/Instructions/SelfDiscoveryModal";
import SelfDiscoveryCard from "./SelfDiscoveryCard";
import ThemeOfTheWeekCard, { Theme } from "./ThemeOfTheWeekCard";

type Props = {
  profileAddition: UserProfileAddition;
  onEdit: (updatedProfileAddition: UserProfileAddition) => void;
  post: Theme;
};

function SelfDiscovery({ profileAddition, onEdit, post }: Props) {
  const [isInstructionOpen, setIsInstructionOpen] = useState(false);

  const handleInstructionOpen = () => {
    setIsInstructionOpen(true);
  };

  const handleInstructionClose = () => {
    setIsInstructionOpen(false);
  };

  return (
    <VStack width="100%">
      <Text fontWeight="bold" fontSize="lg" mb="2">
        Weekly Theme Exercise{" "}
        <InfoIcon
          color="purple.500"
          onClick={handleInstructionOpen}
          mb={1}
          cursor="pointer"
        />
      </Text>

      {/* Use the modal component here */}
      <SelfDiscoveryModal
        isOpen={isInstructionOpen}
        onClose={handleInstructionClose}
      />

      <Grid
        templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
        gap={4}
        width="100%"
      >
        <ThemeOfTheWeekCard post={post} />
        <VStack gap={2}>
          <SelfDiscoveryCard
            profileAddition={profileAddition}
            onEdit={onEdit}
          />
        </VStack>
      </Grid>
    </VStack>
  );
}

export default SelfDiscovery;
