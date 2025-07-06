import axios from 'axios';
import { Download, FileSpreadsheet, Upload } from "lucide-react";
import { RiFileExcel2Line } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/sdcn-dropdown-menu";
import {
  Box,
  Button,
  FileUpload,
  Icon,
  Spinner,
  Stack,
  useFileUpload,
} from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";
import AppDialog from "../app-dialog";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_IMPORT_DIALOG } from "@/lib/routes";
import { LuUpload } from "react-icons/lu";
import { useState } from "react";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  onImport?: (file: File[]) => Promise<void> | void;
  onDownload?: () => Promise<void> | void;
  onExport?: () => Promise<void> | void;
}

function DataTableETL<TData>({
  table,
  onImport,
  onDownload,
  onExport,
}: DataTableViewOptionsProps<TData>) {
  const { router, searchParams, open: isDialogOpen } = useQuery(
    APP_IMPORT_DIALOG,
    "true"
  );
  const openDialogUrl = useModifyQuery(
    null,
    searchParams,
    [{ key: APP_IMPORT_DIALOG, value: "true" }],
    "set"
  );
  const closeDialogUrl = useModifyQuery(null, searchParams, [
    { key: APP_IMPORT_DIALOG },
  ]);
  const fileUpload = useFileUpload({ maxFiles: 1 });
  const [isImporting, setIsImporting] = useState(false);

  const [uploadKey, setUploadKey] = useState(Date.now());

const handleImport = async () => {
  if (!onImport || fileUpload.acceptedFiles.length === 0) return;

  setIsImporting(true);
  try {
    const file = fileUpload.acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);

    await axios.post('/api/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setUploadKey(Date.now()); // Reset input
    router.push(cancelRedirectUrl); // Close modal
  } catch (error) {
    console.error("Import failed:", error);
    if (axios.isAxiosError(error)) {
      console.log("Backend said:", error.response?.data);
    }
  } finally {
    setIsImporting(false);
  }
};

  if (!onImport && !onDownload && !onExport) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="xs"
            disabled={isImporting}
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ml-auto hidden h-8 lg:flex border-dashed border "
          >
            <Icon>
              <RiFileExcel2Line />
            </Icon>
            ETL
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
        >
          <DropdownMenuLabel>ETL (Extract, Transform, Load)</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {onImport && (
              <DropdownMenuItem
                disabled={isImporting}
                onClick={() => router.push(openDialogUrl)}
              >
                <Upload />
                Import
              </DropdownMenuItem>
            )}
            {onDownload && (
              <DropdownMenuItem disabled={isImporting} onClick={onDownload}>
                <FileSpreadsheet />
                Download import template
              </DropdownMenuItem>
            )}
            {onExport && (
              <DropdownMenuItem disabled={isImporting} onClick={onExport}>
                <Download />
                Export
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {onImport && (
        <AppDialog
          title="Import Data"
          open={isDialogOpen}
          placement="center"
          redirectUri={closeDialogUrl}
          cancelQueries={[]}
          hasFooter={false}
        >
          <Stack gap={6}>
            <div className="flex flex-col gap-4">
              <FileUpload.RootProvider
                maxW="xl"
                alignItems="stretch"
                value={fileUpload}
                _disabled={isImporting}
              >
                <FileUpload.HiddenInput />
                <FileUpload.Dropzone>
                  <Icon size="md" color="fg.muted">
                    <LuUpload />
                  </Icon>
                  <FileUpload.DropzoneContent>
                    <Box>Drag and drop files here</Box>
                    <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                  </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
                <FileUpload.List />
              </FileUpload.RootProvider>
            </div>
            <Box className="flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => router.push(closeDialogUrl)}
                disabled={isImporting}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                colorScheme="primary"
                onClick={handleImport}
                disabled={isImporting || fileUpload.acceptedFiles.length === 0}
              >
                {isImporting && <Spinner size="sm" mr={2} />}
                {isImporting ? "Importing..." : "Import"}
              </Button>
            </Box>
          </Stack>
        </AppDialog>
      )}
    </>
  );
}

export default DataTableETL;
