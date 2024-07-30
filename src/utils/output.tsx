import { Box, Text, render, useApp } from "ink";
import { useEffect, type FC, type PropsWithChildren } from "react";

const Container: FC<PropsWithChildren> = ({ children }) => {
  const { exit } = useApp();

  useEffect(() => {
    exit();
  }, []);

  return children;
};

const TemplateComponent: FC<{ content: string }> = ({ content }) => (
  <Box
    borderColor="grey"
    borderStyle="single"
    display="flex"
    alignItems="center"
    justifyContent="center"
    padding={1}
    width="100%"
  >
    <Text color="white">{content}</Text>
  </Box>
);

const TitleComponent: FC<{ content: string }> = ({ content }) => (
  <Box
    borderColor="yellow"
    borderStyle="single"
    display="flex"
    alignItems="center"
    justifyContent="center"
    padding={1}
    width="100%"
  >
    <Text color="white" underline bold>
      {content}
    </Text>
  </Box>
);

export const outputTemplate = async (template: string) => {
  const { waitUntilExit, unmount } = render(
    <Container>
      <TemplateComponent content={template} />
    </Container>
  );
  
  await waitUntilExit();
  await unmount();

  return template
};

export const outputTitle = async (title: string) => {
  const { waitUntilExit, unmount } = render(
    <Container>
      <TitleComponent content={title} />
    </Container>
  );

  await waitUntilExit();
  await unmount();

  return title;
};
