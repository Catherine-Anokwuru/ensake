"use client";

import {
  Avatar,
  Box,
  Flex,
  HStack,
  Image,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { navigation } from "./items";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { useSnapshot } from "valtio";
import { userState } from "@/store/userStore";

const DashboardLayout: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const snap = useSnapshot(userState);
  return (
    <Flex
      w={"100vw"}
      maxW={"1900px"}
      mx={"auto"}
      className="plusJakartaSans"
      overflow={"hidden"}
      h={"100vh"}
    >
      <Toaster />
      <Flex
        flexDir={"column"}
        borderRight={"1px solid #E1E4EA"}
        maxWidth={{ md: "200px", lg: "272px" }}
        w={"100%"}
        h={"100%"}
        py={"24px"}
        px={"20px"}
        hideBelow={"md"}
        justifyContent={"space-between"}
      >
        <Box>
          <Flex
            w={"100%"}
            px={"4px"}
            alignItems={"center"}
            justifyContent={"space-between"}
            pb={"12px"}
          >
            <Flex w={"100%"} alignItems={"center"} gap={"12px"}>
              <Image
                src="ensake.svg"
                alt="logo"
                maxW={"40px"}
                w={"100%"}
                h={"40px"}
              />
              <Box>
                <Text
                  color={"black_secondary"}
                  fontWeight={500}
                  fontSize={"14px"}
                  lineHeight={"20px"}
                  letterSpacing={"-0.6%"}
                >
                  Ensake
                </Text>
                <Text
                  fontWeight={400}
                  fontSize={"12px"}
                  lineHeight={"16px"}
                  color={"grey"}
                >
                  Loyalties
                </Text>
              </Box>
            </Flex>
            <Box
              px={"5.69px"}
              py={"3.64px"}
              border={"1px solid #E1E4EA"}
              borderRadius={"6px"}
              m={"auto"}
            >
              <Image
                src={"/icons/arrow-up-down.svg"}
                alt="up-down arrow"
              />
            </Box>
          </Flex>
          <Box h={"1px"} bg={"#E1E4EA"} w={"100%"} mb={"20px"}></Box>
          <Text
            as={"h5"}
            color={"light_grey"}
            fontWeight={500}
            letterSpacing={"4%"}
            lineHeight={"16px"}
            fontSize={"12px"}
            mb={"12px"}
          >
            MAIN
          </Text>
          <Flex gap={"4px"} hideBelow={"md"} w={"100%"}>
            <List.Root
              display={{ base: "none", md: "flex" }}
              gap={"8px"}
              alignItems={"center"}
              listStyleType={"none"}
              flexDir={"column"}
              fontFamily=""
              w={"100%"}
            >
              {navigation.map((item, idx) => {
                const { text, icon, url } = item;
                return (
                  <List.Item key={idx} w={"100%"} pos={"relative"}>
                    {pathname === item.url && (
                      <Box
                        w={"4px"}
                        h={"20px"}
                        bg={"#0066F9"}
                        ml={"-20px"}
                        borderRightRadius={"4px"}
                        pos={"absolute"}
                        top={0}
                        bottom={0}
                        my={"auto"}
                      ></Box>
                    )}
                    <Link href={url}>
                      <Flex
                        as={"button"}
                        gap={"10.5px"}
                        h={"40px"}
                        w={"100%"}
                        borderRadius={"4px"}
                        alignItems={"center"}
                        justifyContent={"flex-start"}
                        pl={"14.5px"}
                        pr={"19px"}
                        bg={
                          pathname === item.url
                            ? "#F5F7FA"
                            : "transparent"
                        }
                        cursor={"pointer"}
                      >
                        <Image
                          src={icon}
                          alt={text}
                          h={"auto"}
                          w={"15px"}
                        />
                        <Text
                          fontWeight={500}
                          fontSize={"14px"}
                          lineHeight={"20px"}
                          letterSpacing={"-0.6%"}
                          color={
                            pathname === item.url
                              ? "black_secondary"
                              : "grey"
                          }
                        >
                          {text}
                        </Text>
                      </Flex>
                    </Link>
                  </List.Item>
                );
              })}
            </List.Root>
          </Flex>
        </Box>

        <Flex
          px={{ lg: "12px" }}
          pt={"12px"}
          pb={"-12px"}
          borderTop={"1px solid #E1E4EA"}
        >
          <HStack gap="14px">
            <Avatar.Root
              w={"40px"}
              h={"40px"}
              border={"0px"}
              outline={"0px"}
              hideBelow={"lg"}
            >
              <Avatar.Fallback name={snap.name} />
              <Avatar.Image
                src={"/images/user.webp"}
                border={"0px"}
                outline={"0px"}
              />
            </Avatar.Root>
            <Stack gap="4px">
              <Text
                fontWeight={500}
                fontSize={"14px"}
                lineHeight={"20px"}
                letterSpacing={"-0.6%"}
              >
                {snap.name}
              </Text>
              <Text
                color="grey"
                fontSize="14px"
                lineHeight={"20px"}
                letterSpacing={"-0.6%"}
              >
                {snap.email}
              </Text>
            </Stack>
          </HStack>
        </Flex>
      </Flex>
      <Flex
        flexDir={"column"}
        w={"100%"}
        bg={"white"}
        pos={"relative"}
      >
        <Flex
          px={{ base: "14px", md: "32px" }}
          py={"20px"}
          w={"100%"}
          justifyContent={"space-between"}
          gap={"20px"}
          maxW={"1650px"}
        >
          <HStack gap="14px">
            <Avatar.Root
              w={"56px"}
              h={"56px"}
              border={"0px"}
              outline={"0px"}
            >
              <Avatar.Fallback name={snap.name} />
              <Avatar.Image
                src={"/images/user.webp"}
                border={"0px"}
                outline={"0px"}
              />
            </Avatar.Root>
            <Stack gap="4px">
              <Text
                fontWeight={500}
                fontSize={"18px"}
                lineHeight={"24px"}
                letterSpacing={"-1.5%"}
                hideFrom={"md"}
                className="plusJakartaSans"
              >
                Welcome {snap.name}
              </Text>
              <Text
                fontWeight={500}
                fontSize={"18px"}
                lineHeight={"24px"}
                letterSpacing={"-1.5%"}
                hideBelow={"md"}
              >
                {snap.name}
              </Text>
              <Text
                color="grey"
                fontSize="14px"
                lineHeight={"20px"}
                letterSpacing={"-0.6%"}
                hideBelow={"md"}
              >
                Welcome Back To Ensake
              </Text>
            </Stack>
          </HStack>
          <Flex
            gap={"12.26px"}
            alignItems={"center"}
            hideBelow={"md"}
          >
            <Image
              src="/icons/search.svg"
              alt="search"
              w={"15.24px"}
              h={"auto"}
            />
            <Image
              src="/icons/notification.svg"
              alt="notification"
              w={"15px"}
              h={"auto"}
            />
          </Flex>
        </Flex>
        <Box
          as={"main"}
          h={"100%"}
          overflow={"scroll"}
          className="no-scrollbar"
          w={"100%"}
          px={{ base: "14px", md: "32px" }}
          maxW={"1650px"}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};
export default DashboardLayout;
