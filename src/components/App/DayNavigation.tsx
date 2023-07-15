import React from "react";
import { Box, Icon, Text, Tabs, TabList, Tab, Flex } from "@chakra-ui/react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import moment from "moment";

type DayNavigationProps = {
  onPreviousDay: () => void;
  onNextDay: () => void;
  startOfDay: string;
  setActiveTab: (value: "me" | "team") => void; // <- Define this here
  activeTab: "me" | "team"; // New prop
};

const DayNavigation: React.FC<DayNavigationProps> = ({
  onPreviousDay,
  onNextDay,
  startOfDay,
  setActiveTab, // <- Add this here
  activeTab, // New argument
}) => {
  const currentDate = moment(startOfDay);
  const currentDay = currentDate.format("DD MMM YYYY");

  const handleTabChange = (index: any) => {
    if (index === 0) {
      setActiveTab("me");
    } else if (index === 1) {
      setActiveTab("team");
    }
  };

  return (
    <Flex align="center" justify="space-between">
      <Flex align="center">
        <Box
          as="button"
          aria-label="Previous Day"
          onClick={onPreviousDay}
          cursor="pointer"
          _hover={{ bg: "gray.100" }}
          p={1}
          rounded="md"
        >
          <Icon as={MdChevronLeft} fontSize="24px" color="gray.500" />
        </Box>
        <Box
          as="button"
          aria-label="Next Day"
          onClick={onNextDay}
          cursor="pointer"
          _hover={{ bg: "gray.100" }}
          p={1}
          rounded="md"
          ml={2}
        >
          <Icon as={MdChevronRight} fontSize="24px" color="gray.500" />
        </Box>
        <Text fontSize="xl" fontWeight="semibold" ml={2}>
          {currentDay}
        </Text>
      </Flex>
      <Flex align="center">
        <Tabs
          variant="soft-rounded"
          colorScheme="purple"
          defaultIndex={activeTab === "me" ? 0 : 1}
          onChange={handleTabChange}
          align="center"
          mr={{ base: 2, md: 10 }}
        >
          <TabList mb="1em">
            <Tab>Me</Tab>
            <Tab>Team</Tab>
          </TabList>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default DayNavigation;
