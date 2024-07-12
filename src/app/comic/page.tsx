"use client";

import { CustomizationProvider } from "@twilio-paste/core/customization";
import { Box, Heading, Topbar, TopbarActions, Text } from "@twilio-paste/core";

import { useEffect, useState } from "react";
import Tile from "@/components/Tile";
import StoryGrid from "@/components/StroyGrid";

import { Frame } from "@/types/Comic";
import StorageService from "@/services/StorageService";

export default function Page() {
  const [frames, setFrames] = useState<Frame[]>([]); // Pass an empty array as the initial value

  useEffect(() => {
    StorageService.getStory("---FIX ME--")
      .then((f) => setFrames(f))
      .catch((err) => console.log("Error fetching frames", err));
  }, []);

  return (
    <CustomizationProvider baseTheme="default">
      <Box minWidth="size80">
        <Topbar id="topbar">
          <Heading as="h1" variant="heading20" marginBottom="space0">
            Benjamin's Comic Generator
          </Heading>

          <TopbarActions justify="end">
            <Text as="span">Frame count {frames.length}</Text>
          </TopbarActions>
        </Topbar>
      </Box>

      <Box padding="space50">
        <StoryGrid>
          {frames.map((f, idx) => (
            <Tile url={f.url} key={`frame-${idx}`} />
          ))}
        </StoryGrid>
      </Box>
    </CustomizationProvider>
  );
}
