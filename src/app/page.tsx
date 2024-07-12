"use client";

import { CustomizationProvider } from "@twilio-paste/core/customization";
import { Box } from "@twilio-paste/core";

import Link from "next/link";

export default function Home() {
  return (
    <CustomizationProvider baseTheme="default">
      <Box padding={"space50"}>
        Check out the story board <Link href={"/storyboard"}>Here</Link>
      </Box>
    </CustomizationProvider>
  );
}
