import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        green: { value: "#2C686D" },
        black_primary: { value: "#111827" },
        black_secondary: { value: "#0E121B" },
        grey: { value: "#525866" },
        light_grey: { value: "#99A0AE" },
        ash: { value: "#6B7280" },
        blue: { value: "#2563EB" },
      },
    },
  },
  globalCss: {
    "html, body": {},
  },
});

const theme = mergeConfigs(defaultConfig, config);
const system = createSystem(theme);

export default system;
