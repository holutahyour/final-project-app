"use client"
import { SessionProvider } from "next-auth/react";

import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./chakra-color-mode"

import "@/app/globals.css";
import { AzureAuthProvider } from "@/app/context/auth-context";
import { RoleSelectionProvider } from "@/app/context/roleSelection-context";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          DEFAULT: { value: "#739E73" },
          50: { value: "#F3F8F3" },
          100: { value: "#E1EFE1" },
          200: { value: "#C3DFC3" },
          300: { value: "#A5CFA5" },
          400: { value: "#87BF87" },
          500: { value: "#739E73" }, // Primary color
          600: { value: "#5C7F5C" },
          700: { value: "#466046" },
          800: { value: "#304130" },
          900: { value: "#1A211A" },
          950: { value: "#0D100D" },
        }
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.500}" },
          contrast: { value: "{colors.brand.50}" },
          fg: { value: "{colors.brand.700}" },
          muted: { value: "{colors.brand.50}" },
          subtle: { value: "{colors.brand.200}" },
          emphasized: { value: "{colors.brand.300}" },
          focusRing: { value: "{colors.brand.500}" },
        },
      },
    }
  },
  globalCss: {
    html: {
      colorPalette: "brand",
    },
  },
})

export const system = createSystem(defaultConfig, config)

export function Providers(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <SessionProvider>
        <AzureAuthProvider>
          <RoleSelectionProvider>

            <ColorModeProvider defaultTheme="light" {...props} />
          </RoleSelectionProvider>

        </AzureAuthProvider>

      </SessionProvider>
    </ChakraProvider>
  );
}
