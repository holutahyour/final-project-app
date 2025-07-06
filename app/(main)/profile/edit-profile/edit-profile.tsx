import { useAzureAuth } from "@/app/context/auth-context";
import AppDrawer from "@/components/app/app-drawer";
import { Field } from "@/components/ui/chakra-field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/sdcn-avatar";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DRAWER, APP_ERP_SETTINGS_DIALOG } from "@/lib/routes";
import { getInitials } from "@/lib/utils";
import { Box, Heading, HStack, Input, Stack, Text, Textarea, useFileUpload } from "@chakra-ui/react";
import { Camera } from "lucide-react";
import { useState } from "react";

function EditProfile() {
  const [profile, setProfile] = useState<null>();
  const { searchParams, open } = useQuery(APP_DRAWER, "true");
  const { user } = useAzureAuth()


  const redirectUri = useModifyQuery(null, searchParams, [
    { key: APP_DRAWER, value: "true" },
  ]);

  const onSubmit = () => {
    console.log("submitted");
  };

  return (
    <AppDrawer
      title={`${!profile ? "Edit " : ""}Profile`}
      placement="end"
      size="lg"
      open={open}
      redirectUri={redirectUri}
      cancelQueryKey={APP_ERP_SETTINGS_DIALOG}
      hasFooter
      saveButtonTitle="Save Changes"
    >
      <Stack gap='6'>
        <Box className="bg-white shadow-sm px-8 py-4 rounded-2xl border">
          <HStack gap='6'>
            <Avatar className="h-28 w-28 rounded-full">
              <AvatarImage src={""} alt={user?.name} />
              <AvatarFallback className="rounded-full">
                <Camera />
              </AvatarFallback>
            </Avatar>
            <Stack>
              <Text className="font-bold text-md">{user?.name}</Text>
              <Text className="text-xs">Computer Science</Text>
              <Text className="text-xs">400L</Text>
            </Stack>
          </HStack>
        </Box>

        <Box className="bg-white shadow-sm px-8 py-8 rounded-2xl border">
          <Stack gap='6'>
            <Heading>Personal Information</Heading>
            <Field
              required
              label="First Name"
              flex="1"
            >
              <Input

              />
            </Field>
            <Field
              required
              label="Last Name"
              flex="1"
            >
              <Input

              />
            </Field>
            <Field
              required
              label="Email Address"
              flex="1"
            >
              <Input

              />
            </Field>
            <Field
              required
              label="Phone Number"
              flex="1"
            >
              <Input

              />
            </Field>
          </Stack>
        </Box>   

        <Box className="bg-white shadow-sm px-8 py-8 rounded-2xl border">
          <Stack gap='6'>
            <Heading>Academic Details</Heading>
            <Field
              required
              label="Matric Number"
              flex="1"
            >
              <Input

              />
            </Field>
            <Field
              required
              label="Faculty"
              flex="1"
            >
              <Input

              />
            </Field>
            <Field
              required
              label="Department"
              flex="1"
            >
              <Input

              />
            </Field>
            <Field
              required
              label="Level"
              flex="1"
            >
              <Input

              />
            </Field>
          </Stack>
        </Box>    
      </Stack>
    </AppDrawer>
  );

}

export default EditProfile