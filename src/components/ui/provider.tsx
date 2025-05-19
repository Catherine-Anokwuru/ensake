"use client";

import { ChakraProvider } from "@chakra-ui/react";
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode";
import { CacheProvider } from "@emotion/react";
import { emotionCache } from "../../../lib/emotion-cache";
import system from "@/theme";

export function Provider(props: ColorModeProviderProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider value={system}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
    </CacheProvider>
  );
}
