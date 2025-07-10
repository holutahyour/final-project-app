import AppDrawer from "@/components/app/app-drawer";
import { Field } from "@/components/ui/chakra-field";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_ERP_SETTINGS_DIALOG, ARTICLE_DRAWER } from "@/lib/routes";
import { Box, FileUpload, Icon, Input, Stack, Textarea, useFileUpload } from "@chakra-ui/react";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";

function SubmitArticle() {
  const [submission, setSubmission] = useState<null>();
  const { searchParams, open } = useQuery(ARTICLE_DRAWER, "true");

  const redirectUri = useModifyQuery(null, searchParams, [
    { key: ARTICLE_DRAWER, value: "true" },
  ]);

  const fileUpload = useFileUpload({ maxFiles: 1 });
  const [isImporting, setIsImporting] = useState(false);

  const onSubmit = () => {
    console.log("submitted");
  };

  return (
    <AppDrawer
      title={`${!submission ? "Submit " : ""}Article`}
      placement="end"
      size="lg"
      open={open}
      redirectUri={redirectUri}
      cancelQueryKey={APP_ERP_SETTINGS_DIALOG}
      hasFooter
      saveButtonTitle="Submit Article"
    >
      <Stack gap='6'>
        <div className="flex flex-col">
          <FileUpload.RootProvider
            //maxW="xl"
            alignItems="stretch"
            value={fileUpload}
          >
            <FileUpload.HiddenInput />
            <FileUpload.Dropzone>
              <Icon size="xl" color="fg.muted">
                <FaFileUpload />
              </Icon>
              <FileUpload.DropzoneContent>
                <Box fontWeight='bold'>Drag and drop your article here or Select file</Box>
                <Box color="fg.muted" fontSize='xs'>.PDF, DOC, or DOCX to 50MB</Box>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUpload.List showSize clearable />
          </FileUpload.RootProvider>
        </div>
        <Field
          required
          label="Title"
          flex="1"
        >
          <Input

          />
        </Field>
        <Field
          required
          label="Keywords"
          flex="1"
        >
          <Input

          />
        </Field>
        <Field label="Abstract" flex="1">
          <Textarea

          />
        </Field>
      </Stack>

    </AppDrawer>
  );

}

export default SubmitArticle