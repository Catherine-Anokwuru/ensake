"use client";
import React from "react";
import { NativeSelect } from "./ui/native-select";
import { Icon } from "@chakra-ui/react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const LocaleSwitcher: React.FC<{ currentLocale: string }> = ({
  currentLocale,
}) => {
  return (
    <NativeSelect
      color={"grey"}
      fontSize={"14px"}
      lineHeight={"20px"}
      letterSpacing={"-0.6%"}
      mr={"2px"}
      border={"0px"}
      w={"62px"}
      icon={
        <Icon color={"grey"} fontSize={"19px"}>
          <MdOutlineKeyboardArrowDown />
        </Icon>
      }
      value={currentLocale}
      onChange={(e) => {
        const selected = e.target.value;
        window.location.href = `/${selected}/login`;
      }}
      items={[
        { value: "en", label: "ENG" },
        { value: "de", label: "DEU" },
      ]}
    />
  );
};
export default LocaleSwitcher;
