import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Flex,
  MenuDivider,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { auth } from "../../../firebase/clientApp";
import { useRouter } from "next/router";
import { useResetRecoilState } from "recoil";
import { buddyRequestState } from "@/atoms/buddyRequestsAtom";
import { IoSparkles } from "react-icons/io5";
import useUserPoints from "@/hooks/useUserPoints";
import { useUserData } from "@/hooks/useUserData";

type UserMenuProps = { user?: User | null };

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const router = useRouter();
  const resetBuddyRequests = useResetRecoilState(buddyRequestState);

  const { userPoints } = useUserPoints(user as User);

  const { username, imagePreview } = useUserData(user as User);

  const logout = async () => {
    if (!user) {
      console.error("No user to log out");
      return;
    }

    // Reset the recoil state
    resetBuddyRequests();

    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Menu>
      <MenuButton cursor="pointer" padding="0px 6px" borderRadius={4}>
        <Flex align="center" gap={2}>
          {imagePreview != "" ? (
            <Avatar size="sm" name={username} src={imagePreview} />
          ) : (
            <Avatar size="sm" />
          )}
          <Flex
            direction="column"
            display={{ base: "none", lg: "flex" }}
            fontSize="9pt"
            align="flex-start"
            mr={8}
          >
            <Text fontWeight={700}>
              {user?.displayName || user?.email?.split("@")[0]}
            </Text>
            <Flex>
              <Icon as={IoSparkles} color="#ff5e0e" mr={1} />
              <Text color="gray.500">{userPoints} K-Points</Text>
            </Flex>
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem
          fontSize="10pt"
          fontWeight={700}
          _hover={{ bg: "purple.500", color: "white" }}
          onClick={() => router.push("/profile")}
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={CgProfile} />
            Profile
          </Flex>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          fontSize="10pt"
          fontWeight={700}
          _hover={{ bg: "purple.500", color: "white" }}
          onClick={logout}
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
            Log Out
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
