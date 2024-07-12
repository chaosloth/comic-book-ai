"use client";

import { CustomizationProvider } from "@twilio-paste/core/customization";
import {
  Box,
  Heading,
  Topbar,
  TopbarActions,
  Text,
  Button,
} from "@twilio-paste/core";

import { useState } from "react";
import Tile from "@/components/Tile";
import StoryGrid from "@/components/StroyGrid";

import { Frame } from "@/types/Comic";
import NewFrameModal from "@/components/NewFrameModal";
import StorageService from "@/services/StorageService";

import { v4 as uuidv4 } from "uuid";

export default function Page() {
  const [story_uuid, setStoryUUid] = useState<string>(uuidv4());
  const [frames, setFrames] = useState<Frame[]>([]); // Pass an empty array as the initial value
  const [isNewFrameModalOpen, setNewFrameModalOpen] = useState<boolean>(false);

  const handleAddFrame = (frame: Frame) => {
    console.log("Adding frame", frame);
    frame.story_uuid = story_uuid;
    setFrames((prev) => [...prev, frame]);
    setNewFrameModalOpen(false);
    StorageService.saveFrame(frame)
      .then(() => console.log("Saved frame"))
      .catch((err) => console.log("Error saving frame", err));
  };

  const handleNewFrameDismiss = () => {
    setNewFrameModalOpen(false);
  };

  return (
    <CustomizationProvider baseTheme="default">
      <NewFrameModal
        onAcceptFrame={handleAddFrame}
        onDismiss={handleNewFrameDismiss}
        isOpen={isNewFrameModalOpen}
      />

      <Box minWidth="size80">
        <Topbar id="topbar">
          <Heading as="h1" variant="heading20" marginBottom="space0">
            Benjamin's Comic Generator
          </Heading>

          <TopbarActions justify="end">
            <Text as="span">Frame count {frames.length}</Text>
            <Button
              variant={"primary"}
              onClick={() => setNewFrameModalOpen(!isNewFrameModalOpen)}
            >
              Add new frame
            </Button>
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
