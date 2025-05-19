"use client";

import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { availableRewards, claimableRewards } from "../items";
import { useSessionManager } from "@/hooks/useSessionManager";

const Dashboard: React.FC = () => {
  useSessionManager();

  return (
    <Box
      bg={"#F9FAFB"}
      mt={"8px"}
      maxW={"768px"}
      w={"100%"}
      mx={"auto"}
      mb={"62px"}
      fontFamily={"inter"}
    >
      <Box maxW={"480px"} w={"100%"} mx={"auto"} py={"33px"}>
        <Box
          bg={"#0066F9"}
          borderRadius={"16px"}
          p={"24px"}
          w={"100%"}
          color={"white"}
          mb={"34px"}
        >
          <Text
            fontWeight={500}
            fontSize={"11.9px"}
            lineHeight={"20px"}
            mb={"6px"}
          >
            Your Points
          </Text>
          <Text
            fontWeight={700}
            fontSize={"30.06px"}
            lineHeight={"40px"}
            mb={"4px"}
          >
            500
            <Text
              as={"span"}
              fontWeight={400}
              fontSize={"11.9px"}
              lineHeight={"20px"}
            >
              pts
            </Text>
          </Text>
          <Text
            fontWeight={400}
            fontSize={"11.9px"}
            lineHeight={"20px"}
            mb={"6px"}
          >
            ₦150
          </Text>
        </Box>
        <Box>
          <Text
            as={"h3"}
            fontWeight={600}
            fontSize={"15.3px"}
            lineHeight={"28px"}
            mb={"19.5px"}
          >
            Available Rewards
          </Text>
          <Stack gap={"16px"}>
            {availableRewards.map((item, idx) => {
              return (
                <Flex
                  key={idx}
                  bg={"white"}
                  border={"1px solid #E5E7EB"}
                  borderRadius={"12px"}
                  p={"17px"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Flex alignItems={"center"} gap={"16px"}>
                    <Image
                      src={item.image}
                      alt={item.text}
                      w={"48px"}
                      h={"48px"}
                    />
                    <Text
                      fontWeight={500}
                      fontSize={"11.9px"}
                      lineHeight={"20px"}
                      color={"black_primary"}
                    >
                      {item.text}
                    </Text>
                  </Flex>
                  <Button
                    bg={"#EFF6FF"}
                    w={"100%"}
                    h={"28px"}
                    maxW={"69.14px"}
                    borderRadius={"9999px"}
                    fontWeight={500}
                    fontSize={"11.9px"}
                    lineHeight={"20px"}
                    color={"blue"}
                  >
                    Claim
                  </Button>
                </Flex>
              );
            })}
          </Stack>
        </Box>
        <Box mt={"32px"}>
          <Text
            as={"h3"}
            fontWeight={600}
            fontSize={"15.3px"}
            lineHeight={"28px"}
            mb={"19.5px"}
          >
            Claimable Rewards
          </Text>
          <Stack gap={"16px"}>
            {claimableRewards.map((item, idx) => {
              return (
                <Flex
                  key={idx}
                  bg={"white"}
                  border={"1px solid #E5E7EB"}
                  borderRadius={"12px"}
                  p={"17px"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Flex alignItems={"center"} gap={"16px"}>
                    <Image
                      src={item.image}
                      alt={item.text}
                      w={"48px"}
                      h={"48px"}
                    />
                    <Box>
                      <Text
                        fontWeight={500}
                        fontSize={"11.9px"}
                        lineHeight={"20px"}
                        color={"black_primary"}
                        mb={"4px"}
                      >
                        {item.text}
                      </Text>
                      <Text
                        fontWeight={400}
                        fontSize={"11.9px"}
                        lineHeight={"20px"}
                        color={"ash"}
                      >
                        {item.points}{" "}
                        <Text as={"span"} fontSize={"10px"}>
                          pts
                        </Text>
                      </Text>
                    </Box>
                  </Flex>
                  <Flex flexDir={"column"} alignItems={"flex-end"}>
                    <Button
                      bg={"#EFF6FF"}
                      w={"69.14px"}
                      h={"28px"}
                      borderRadius={"9999px"}
                      fontWeight={500}
                      fontSize={"11.9px"}
                      lineHeight={"20px"}
                      color={"blue"}
                    >
                      Claim
                    </Button>
                    <Text
                      fontWeight={400}
                      fontSize={"11.9px"}
                      lineHeight={"20px"}
                      color={"ash"}
                    >
                      ₦{item.amount}
                    </Text>
                  </Flex>
                </Flex>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
