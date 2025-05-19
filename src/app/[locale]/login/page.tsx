"use client";

import Input from "@/components/Input";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster, toaster } from "@/components/ui/toaster";
import { userState } from "@/store/userStore";
import api from "@/utils/api";
import {
  Box,
  Button,
  Circle,
  Field,
  Flex,
  Icon,
  Image,
  InputGroup,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { UAParser } from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";

type LoginFormInputs = {
  email: string;
  password: string;
};

type Props = {
  params: Promise<{ locale: string }>;
};

async function getMessages(locale: string) {
  switch (locale) {
    case "de":
      return (await import("../../../../locales/de.json")).default;
    case "en":
    default:
      return (await import("../../../../locales/en.json")).default;
  }
}

const Login: React.FC<Props> = ({ params }) => {
  const { locale } = use(params);

  const date = new Date();

  const [showPassword, setShowPasword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();
  const [messages, setMessages] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    let isMounted = true;
    getMessages(locale).then((msgs) => {
      if (isMounted) setMessages(msgs);
    });
    return () => {
      isMounted = false;
    };
  }, [locale]);

  useEffect(() => {
    const existingId = localStorage.getItem("ensake-device-id");
    if (!existingId) {
      const id = uuidv4();
      localStorage.setItem("ensake-device-id", id);
    }

    const parser = new UAParser();
    const browser = parser.getBrowser();
    const browserInfo = `${browser.name} ${browser.version}`;
    localStorage.setItem("ensake-device-name", browserInfo);
  }, []);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await api.post("/login", data);

      const token = response.data.customer?.token;

      userState.name = `${response.data.customer?.first_name} ${response.data.customer?.last_name}`;

      userState.email = response.data.customer?.email;

      if (token) {
        localStorage.setItem("ensake-token", token);
        localStorage.setItem(
          "ensake-keep-logged-in",
          keepLoggedIn ? "true" : "false"
        );

        const ttl = keepLoggedIn
          ? 3 * 24 * 60 * 60 * 1000
          : 5 * 60 * 1000;

        const expiry = Date.now() + ttl;
        localStorage.setItem(
          "ensake-token-expiry",
          expiry.toString()
        );

        router.push("/rewards");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.status === 401) {
        toaster.create({
          title: "Incorrect username or password",
          type: "error",
          duration: 3000,
        });
      } else {
        toaster.create({
          title: "Something went wrong. Please try again later.",
          type: "error",
          duration: 3000,
        });
      }
      console.log(error);
    }
  };

  return (
    <Flex
      maxWidth={"1900px"}
      m={"auto"}
      flexDir={"column"}
      w={"100vw"}
      minH={"100vh"}
      h={"100%"}
      maxH={"100%"}
      bg={"white"}
      px={{ base: "25px", md: "44px" }}
      py={{ base: "12px", md: "24px" }}
      className={"plusJakartaSans"}
      pos={"relative"}
    >
      <Toaster />

      <Flex
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Icon
          as={IoIosArrowBack}
          hideFrom={"md"}
          color={"black_secondary"}
        />
        <Image
          src={"/ensake.svg"}
          alt="Ensake logo"
          width={"40px"}
          hideBelow={"md"}
          height={"40px"}
        />
        <Flex alignItems={"center"} gap={"6.5px"}>
          <Image
            src={"/icons/globe.svg"}
            alt="globe"
            w={"15px"}
            h={"15px"}
            hideBelow={"md"}
          />
          <LocaleSwitcher currentLocale={locale} />
        </Flex>
      </Flex>
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        h={"100%"}
        m={{ md: "auto" }}
        mt={{ base: "36px", md: "auto" }}
      >
        <Flex
          h={"100%"}
          w={"100%"}
          justifyContent={"center"}
          alignItems={{ md: "center" }}
        >
          <Flex
            flexDir={"column"}
            alignItems={{ md: "center" }}
            border={{ md: "1px solid #E1E4EA" }}
            borderRadius={{ md: "20px" }}
            maxW={"440px"}
            w={"100%"}
            p={{ md: "32px" }}
          >
            <Circle
              size={"96px"}
              bgImage={
                "linear-gradient(180deg, rgba(113, 119, 132, 0.1) 0%, rgba(113, 119, 132, 0) 100%)"
              }
              hideBelow={"md"}
            >
              <Circle
                size={"64px"}
                border={"1px solid #E1E4EA"}
                bg={"white"}
              >
                <Image src={"/icons/user.svg"} alt="user-profile" />
              </Circle>
            </Circle>
            <Text
              fontWeight={500}
              fontSize={{ base: "20px", md: "24px" }}
              lineHeight={{ base: "28px", md: "32px" }}
              mt={"8px"}
              mb={"4px"}
              textAlign={{ base: "left", md: "center" }}
              color={"black_secondary"}
            >
              {messages["Login.heading"]}
            </Text>
            <Text
              fontSize={{ base: "14px", md: "16px" }}
              lineHeight={{ base: "20px", md: "24px" }}
              letterSpacing={"-1.1%"}
              mb={"24px"}
              color={"grey"}
              textAlign={{ base: "left", md: "center" }}
            >
              {messages["Login.subheading"]}
            </Text>
            <Box
              w={"100%"}
              h={"1px"}
              bg={"#E1E4EA"}
              mb={{ base: "36px", md: "24px" }}
              hideBelow={"md"}
            ></Box>
            <Box w={"100%"}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="12px">
                  <Field.Root invalid={!!errors.email}>
                    <Field.Label
                      fontWeight={500}
                      fontSize={"14px"}
                      lineHeight={"20px"}
                      letterSpacing={"-0.6%"}
                      color={"black_secondary"}
                    >
                      {messages["Login.email"]}
                    </Field.Label>
                    <InputGroup
                      startElement={
                        <Image
                          src={"/icons/mail.svg"}
                          alt="email"
                          pl={"14.5px"}
                        />
                      }
                    >
                      <Input
                        {...register("email", {
                          required: "email is required",
                        })}
                        placeholder="hello@ensake.com"
                      />
                    </InputGroup>
                    <Field.ErrorText>
                      {errors.email?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.password}>
                    <Field.Label
                      fontWeight={500}
                      fontSize={"14px"}
                      lineHeight={"20px"}
                      letterSpacing={"-0.6%"}
                      color={"black_secondary"}
                    >
                      {messages["Login.password"]}
                    </Field.Label>
                    <InputGroup
                      startElement={
                        <Image
                          src={"/icons/padlock.svg"}
                          alt="password"
                          pl={"14.5px"}
                        />
                      }
                      endElement={
                        showPassword ? (
                          <Icon
                            as={AiOutlineEyeInvisible}
                            onClick={() => setShowPasword(false)}
                            color={"light_grey"}
                            cursor={"pointer"}
                            mr={"14.5px"}
                            fontSize={"21px"}
                          />
                        ) : (
                          <Icon
                            as={AiOutlineEye}
                            onClick={() => setShowPasword(true)}
                            cursor={"pointer"}
                            color={"light_grey"}
                            fontSize={"21px"}
                            mr={"14.5px"}
                          />
                        )
                      }
                    >
                      <Input
                        placeholder={messages["Login.password"]}
                        {...register("password", {
                          required: "Password is required",
                        })}
                        type={showPassword ? "text" : "password"}
                      />
                    </InputGroup>
                    <Field.ErrorText>
                      {errors.password?.message}
                    </Field.ErrorText>
                  </Field.Root>
                  <Flex
                    mt={{ md: "12px" }}
                    justifyContent={"space-between"}
                    w={"100%"}
                    gap={"10px"}
                    alignItems={"center"}
                  >
                    <Checkbox
                      checked={keepLoggedIn}
                      onCheckedChange={(e) =>
                        setKeepLoggedIn(!!e.checked)
                      }
                      borderRadius={"4px"}
                      size={"sm"}
                      cursor={"pointer"}
                      color={"black_secondary"}
                      fontWeight={400}
                      fontSize={{ base: "12px", md: "14px" }}
                      lineHeight={"20px"}
                      letterSpacing={"-0.6%"}
                    >
                      {messages["Login.keep"]}
                    </Checkbox>
                    <Text
                      fontFamily={"inter"}
                      textDecor={"underline"}
                      fontWeight={500}
                      fontSize={{ base: "12px", md: "14px" }}
                      lineHeight={"20px"}
                      letterSpacing={"-0.6%"}
                      color={"grey"}
                    >
                      {messages["Login.forgot"]}
                    </Text>
                  </Flex>

                  <Button
                    type="submit"
                    color={"white"}
                    bg={"#0066F9"}
                    h={"40px"}
                    w={{ base: "calc(100% - 50px)", md: "100%" }}
                    borderRadius={"10px"}
                    mt={"12px"}
                    maxW={"440px"}
                    pos={{ base: "absolute", md: "unset" }}
                    mx={"auto"}
                    left={0}
                    right={0}
                    bottom={"15%"}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Spinner color={"white"} size={"sm"} />
                    ) : (
                      `${messages["Login.button"]}` || "Login"
                    )}
                  </Button>
                </Stack>
              </form>
            </Box>
          </Flex>
        </Flex>
        <Flex
          fontSize={"14px"}
          lineHeight={"20px"}
          letterSpacing={"0.6%"}
          gap={"4px"}
          justifyContent={"center"}
          mt={"30px"}
          pos={{ base: "absolute", md: "unset" }}
          mx={"auto"}
          px={{ base: "25px", md: 0 }}
          left={0}
          right={0}
          bottom={"10%"}
        >
          <Text color={"grey"}>
            {messages["Login.registerPrompt"]}
          </Text>
          <Text color={"#0066F9"} textDecor={"underline"}>
            {messages["Login.registerLink"]}
          </Text>
        </Flex>
        <Box pos={"absolute"} left={0} bottom={0}>
          <Text
            px={"44px"}
            py={"24px"}
            color={"grey"}
            fontSize={"14px"}
            lineHeight={"20px"}
            letterSpacing={"0.6%"}
          >
            © {date.getFullYear()} Ensake Loyalties
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
export default Login;
