import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Column,
  Flex,
  Form,
  FormControl,
  Grid,
  HelpText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalFooterActions,
  ModalHeader,
  ModalHeading,
  TextArea,
} from "@twilio-paste/core";

import { DeleteIcon } from "@twilio-paste/icons/esm/DeleteIcon";
import { PlusIcon } from "@twilio-paste/icons/esm/PlusIcon";
import { RepeatIcon } from "@twilio-paste/icons/esm/RepeatIcon";

import { FC } from "react";
import { useState } from "react";
import { Frame } from "@/types/Comic";
import GeneratorService from "@/services/GeneratorService";
import Placeholder from "./placeholder";

export type NewFrameProps = {
  isOpen: boolean;
  onAcceptFrame: (frame: Frame) => void;
  onDismiss: () => void;
};

const NewFrame: FC<NewFrameProps> = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [caption, setCaption] = useState("");
  const [data, setData] = useState<any>();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnAcceptFramePress = () => {
    const newFrame = new Frame(
      data.uuid,
      caption,
      prompt,
      data.url,
      data.revised_prompt
    );
    props.onAcceptFrame(newFrame);
  };

  const handleClearPrompt = () => {
    setPrompt("");
    setData(undefined);
    setHasError(false);
  };

  const handleGenerateImage = () => {
    setLoading(true);
    GeneratorService.generateImage(prompt)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching image", err);
        setHasError(true);
        setErrorMessage(err.message);
      });
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onDismiss={props.onDismiss}
      size={"wide"}
      ariaLabelledby={"new_frame_modal_header"}
    >
      <ModalHeader>
        <ModalHeading as="h3" id="new_frame_modal_header">
          Create a comic frame
        </ModalHeading>
      </ModalHeader>
      <ModalBody>
        {hasError && (
          <Alert variant="warning">
            <strong>An error occurred generating an image</strong>{" "}
            {errorMessage}
          </Alert>
        )}

        <Grid>
          <Column>
            <Form aria-labelledby={"prompt_heading"}>
              <FormControl>
                <Label htmlFor="prompt" required>
                  Prompt (at least 120 characters)
                </Label>
                <TextArea
                  onChange={(e) => setPrompt(e.target.value)}
                  aria-describedby="prompt_help_text"
                  id="prompt"
                  name="prompt"
                  value={prompt}
                  required
                  disabled={isLoading}
                />
                <HelpText id="prompt_help_text">
                  Enter a short description of the comic
                </HelpText>
              </FormControl>

              <FormControl>
                <Label htmlFor="prompt" required>
                  Caption (less than 5 words)
                </Label>
                <Input
                  onChange={(e) => setCaption(e.target.value)}
                  aria-describedby="caption_help_text"
                  id="caption"
                  name="caption"
                  value={caption}
                  required
                  disabled={isLoading}
                  type={"text"}
                />
                <HelpText id="caption_help_text">
                  What text should be displayed near this frame
                </HelpText>
              </FormControl>
            </Form>
          </Column>
          <Column>
            <Box padding={"space50"}>
              <Flex hAlignContent={"center"} vAlignContent={"center"}>
                {data && data.url ? (
                  <img src={data.url} width="300px" />
                ) : (
                  <Placeholder loading={isLoading} />
                )}
              </Flex>
            </Box>
          </Column>
        </Grid>
      </ModalBody>
      <ModalFooter>
        <ModalFooterActions>
          <ButtonGroup attached>
            <Button
              variant={"secondary"}
              onClick={handleClearPrompt}
              disabled={isLoading}
            >
              <DeleteIcon decorative={true} />
              Clear
            </Button>

            <Button
              variant={"secondary"}
              onClick={handleGenerateImage}
              disabled={isLoading || prompt.length < 10}
            >
              <RepeatIcon decorative={true} />
              Generate
            </Button>

            <Button
              variant={"secondary"}
              onClick={handleOnAcceptFramePress}
              disabled={isLoading || !data}
            >
              <PlusIcon decorative />
              Add frame
            </Button>
          </ButtonGroup>
          <Button variant={"primary"} onClick={props.onDismiss}>
            Done
          </Button>
        </ModalFooterActions>
      </ModalFooter>
    </Modal>
  );
};

export default NewFrame;
