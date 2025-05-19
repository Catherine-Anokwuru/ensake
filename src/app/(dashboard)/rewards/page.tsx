"use client";

import { toaster } from "@/components/ui/toaster";
import api from "@/utils/api";
import {
  Box,
  Button,
  Circle,
  Flex,
  Image,
  Progress,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSessionManager } from "@/hooks/useSessionManager";
import { NativeSelect } from "@/components/ui/native-select";

export type Reward = {
  id: number;
  brand: {
    id: number;
    name: string;
    logo: string;
    address: string;
  };
  points: number;
  description: string;
  claimed: boolean;
};

const Rewards: React.FC = () => {
  useSessionManager();

  const [points, setPoints] = useState<number>(0);
  const [userRewards, setUserRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState("low-to-high");
  const [showAllRewards, setShowAllRewards] = useState("All Rewards");

  const router = useRouter();

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await api.get("/rewards");
        const { customer_points, rewards } = response.data;

        setPoints(customer_points);
        setUserRewards(rewards);
      } catch (error) {
        if (axios.isAxiosError(error) && error.status === 401) {
          toaster.create({
            title: "Session expired, Please log in again.",
            type: "error",
            duration: 3000,
          });
          setTimeout(() => {
            router.push("/en/login");
          }, 3000);
        } else {
          toaster.create({
            title: "Failed to load rewards",
            type: "error",
            duration: 3000,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, [router]);

  const handleClaim = async (reward: Reward) => {
    if (points < reward.points) {
      toaster.create({
        title: "Insufficient Points",
        description:
          "You do not have enough points to claim this reward.",
        type: "error",
      });
      return;
    }
    setClaiming(reward.id);
    try {
      const response = await api.post("/rewards", {
        reward_id: reward.id,
      });

      setPoints(response.data.customer_points);

      toaster.create({
        title: "Reward claimed successfully.",
        type: "success",
        duration: 3000,
      });

      setUserRewards((prevRewards) =>
        prevRewards.map((r) =>
          r.id === reward.id ? { ...r, claimed: true } : r
        )
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.status === 422) {
        toaster.create({
          title: "Reward already claimed",
          type: "error",
          duration: 3000,
        });
      } else {
        toaster.create({
          title: "Failed to claim reward",
          type: "error",
          duration: 3000,
        });
      }

      console.log(error);
    } finally {
      setClaiming(null);
    }
  };

  const filteredRewards = useMemo(() => {
    let filtered = [...userRewards];

    if (showAllRewards === "Claimable Rewards") {
      filtered = filtered.filter((item) => !item.claimed);
    }

    if (sortOrder === "low-to-high") {
      filtered.sort((a, b) => a.points - b.points);
    } else if (sortOrder === "high-to-low") {
      filtered.sort((a, b) => b.points - a.points);
    }

    return filtered;
  }, [showAllRewards, sortOrder, userRewards]);

  if (loading) {
    return (
      <Box p={10} textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box
      maxW={"783px"}
      w={"100%"}
      bg={"#F9FAFB"}
      px={{ md: "32px" }}
      pb={"46px"}
      pt={"32px"}
      mx={"auto"}
      mb={"62px"}
      fontFamily={"inter"}
    >
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 1, lg: 2 }}
        gap={"12px"}
        w={"100%"}
        mx={"auto"}
        mb={"32px"}
      >
        <Box
          border={"1px solid #E5E7EB"}
          shadow={
            "0px 0px 0px 0px #00000000, 0px 0px 0px 0px #00000000, 0px 1px 2px 0px #0000000D"
          }
          p={{ base: "15px", sm: "25px" }}
          borderRadius={"12px"}
          w={"100%"}
          gap={"5px"}
        >
          <Flex
            w={"100%"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
          >
            <Box>
              <Text
                fontWeight={500}
                fontSize={{ base: "14px", md: "15.3px" }}
                lineHeight={"28px"}
                mb={"6.5px"}
              >
                Your Points Balance
              </Text>
              <Text
                fontWeight={700}
                fontSize={{ base: "20px", md: "30.6px" }}
                lineHeight={"40px"}
              >
                {points || 0}{" "}
                <Text
                  as={"span"}
                  fontWeight={400}
                  fontSize={"13.6px"}
                  lineHeight={"24px"}
                >
                  points
                </Text>
              </Text>
            </Box>
            <Circle bg={"#EFF6FF"} size={"48px"}>
              <Image
                src={"/icons/star.svg"}
                alt={"rewards"}
                w={"20px"}
                h={"auto"}
              />
            </Circle>
          </Flex>
          <Flex
            mt={"16px"}
            borderTop={"1px solid #F3F4F6"}
            fontSize={"11.9px"}
            lineHeight={"20px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={"8px"}
            w={"100%"}
          >
            <Text color={"#4B5563"} fontWeight={400} pt={"8.5px"}>
              Next tier upgrade in 750 points
            </Text>
          </Flex>
          <Progress.Root
            value={points}
            defaultValue={points}
            max={750}
            size={"sm"}
          >
            <Progress.Track bg="#F3F4F6" borderRadius={"9999px"}>
              <Progress.Range bg="blue" />
            </Progress.Track>
          </Progress.Root>
        </Box>
        <Box
          border={"1px solid #E5E7EB"}
          shadow={
            "0px 0px 0px 0px #00000000, 0px 0px 0px 0px #00000000, 0px 1px 2px 0px #0000000D"
          }
          p={{ base: "15px", sm: "25px" }}
          borderRadius={"12px"}
          w={"100%"}
        >
          <Flex
            w={"100%"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
          >
            <Box>
              <Text
                fontWeight={500}
                fontSize={{ base: "14px", md: "15.3px" }}
                lineHeight={"28px"}
                mb={"6.5px"}
              >
                Available Rewards
              </Text>
              <Text
                fontWeight={700}
                fontSize={{ base: "20px", md: "30.6px" }}
                lineHeight={"40px"}
              >
                {userRewards.length || 0}{" "}
                <Text
                  as={"span"}
                  fontWeight={400}
                  fontSize={"13.6px"}
                  lineHeight={"24px"}
                >
                  rewards
                </Text>
              </Text>
            </Box>
            <Circle bg={"#FAF5FF"} size={"48px"}>
              <Image
                src={"/icons/gift.svg"}
                alt={"rewards"}
                w={"24px"}
                h={"auto"}
              />
            </Circle>
          </Flex>
          <Flex
            mt={"16px"}
            borderTop={"1px solid #F3F4F6"}
            fontSize={"11.9px"}
            lineHeight={"20px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={"8px"}
            w={"100%"}
            gap={"5px"}
          >
            <Text color={"#4B5563"} fontWeight={400} pt={"8.5px"}>
              Rewards claimed this month
            </Text>
            <Text color={"black_primary"} fontWeight={500}>
              {userRewards.filter((item) => item.claimed).length} of{" "}
              {userRewards.length}
            </Text>
          </Flex>
          <Progress.Root
            max={userRewards.length}
            defaultValue={
              userRewards.filter((item) => item.claimed).length
            }
            value={userRewards.filter((item) => item.claimed).length}
            size={"sm"}
          >
            <Progress.Track bg="#F3F4F6" borderRadius={"9999px"}>
              <Progress.Range bg="#9333EA" />
            </Progress.Track>
          </Progress.Root>
        </Box>
      </SimpleGrid>
      <Box>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"24px"}
        >
          <Text
            as={"h5"}
            fontWeight={600}
            fontSize={"20.4px"}
            lineHeight={"32px"}
          >
            Claimable Rewards
          </Text>
          <Flex gap={"12px"}>
            <NativeSelect
              maxW={"178.5px"}
              w={"100%"}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.currentTarget.value)}
              items={[
                {
                  label: "low-to-high",
                  value: "low-to-high",
                },
                {
                  label: "high-to-low",
                  value: "high-to-low",
                },
              ]}
            />
            <NativeSelect
              maxW={"350px"}
              w={"100%"}
              value={showAllRewards}
              onChange={(e) => {
                setShowAllRewards(e.currentTarget.value);
              }}
              items={[
                {
                  label: "All Rewards",
                  value: "All Rewards",
                },
                {
                  label: "Claimable Rewards",
                  value: "Claimable Rewards",
                },
              ]}
            />
          </Flex>
        </Flex>
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3 }}
          columnGap={{ base: "12px", md: "24px" }}
          rowGap={{ base: "12px", md: "5px" }}
        >
          {filteredRewards.map((item) => {
            return (
              <Flex
                flexDir={"column"}
                justifyContent={"space-between"}
                key={item.id}
                border={"1px solid #E5E7EB"}
                borderRadius={"12px"}
                shadow={
                  "0px 0px 0px 0px #00000000, 0px 0px 0px 0px #00000000, 0px 1px 2px 0px #0000000D"
                }
                py={"12px"}
                px={"16px"}
                h={"100%"}
              >
                <Flex gap={"15.66px"} h={"100%"}>
                  <Image
                    src={item.brand.logo || "/images/nike.webp"}
                    alt={item.brand.name}
                    w={"48px"}
                    h={"48px"}
                    objectFit={"contain"}
                  />
                  <Box>
                    <Text
                      fontWeight={500}
                      fontSize={"13.6px"}
                      lineHeight={"24px"}
                      color={"black_primary"}
                      mb={"2.5px"}
                    >
                      {item.brand.name}
                    </Text>
                    <Text
                      fontWeight={400}
                      fontSize={"11.9px"}
                      lineHeight={"20px"}
                      color={"ash"}
                      mb={"2px"}
                    >
                      {item.description}
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  mt={"20px"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  alignSelf={"baseline"}
                  w={"100%"}
                >
                  <Text
                    fontWeight={600}
                    fontSize={"13.6px"}
                    lineHeight={"24px"}
                    color={"black_primary"}
                    mb={"2.5px"}
                  >
                    {item.points || 0}{" "}
                    <Text
                      as={"span"}
                      fontWeight={400}
                      fontSize={"11.9px"}
                      lineHeight={"20px"}
                      color={"ash"}
                    >
                      points
                    </Text>
                  </Text>
                  <Button
                    borderRadius={"8px"}
                    bg={"blue"}
                    maxW={"95px"}
                    w={"100%"}
                    py={"12px"}
                    px={"8px"}
                    fontWeight={500}
                    color={"white"}
                    fontSize={"11.9px"}
                    lineHeight={"20px"}
                    disabled={item.claimed || claiming === item.id}
                    onClick={() => handleClaim(item)}
                  >
                    {claiming === item.id ? (
                      <Spinner color={"white"} size={"xs"} />
                    ) : (
                      "Claim Reward"
                    )}
                  </Button>
                </Flex>
              </Flex>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
export default Rewards;
