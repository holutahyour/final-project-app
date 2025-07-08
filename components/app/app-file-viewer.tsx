import { Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';

// Set the worker script for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type AppFileViewerProps = {
    file: File;
};

export default function AppFileViewer({ file }: AppFileViewerProps) {
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    // Determine file type based on extension for consistency
    const extension = file.name.split('.').pop()?.toLowerCase();

    // Generate object URL for PDF files
    useEffect(() => {
        if (extension === 'pdf') {
            const url = URL.createObjectURL(file);
            setPdfUrl(url);
            // Clean up the URL when the component unmounts or file changes
            return () => URL.revokeObjectURL(url);
        } else {
            setPdfUrl(null);
        }
    }, [file, extension]);

    // Handle PDF files
    if (extension === 'pdf' && pdfUrl) {
        return (
            <Stack className='h-full'>
                <iframe
                    src={pdfUrl}
                    width="100%"
                    //height="630px"
                    style={{ border: "none", height: "100%" }}
                    title="PDF Preview"
                />
            </Stack>

        );
    }

    // Handle Word documents (.docx)
    // if (extension === 'docx') {
    //     useEffect(() => {
    //         setIsLoading(true);
    //         mammoth
    //             .convertToHtml({ arrayBuffer: file })
    //             .then((result) => {
    //                 setHtmlContent(result.value);
    //                 setIsLoading(false);
    //             })
    //             .catch((err) => {
    //                 console.error('Error converting Word document:', err);
    //                 setIsLoading(false);
    //             });
    //     }, [file]);

    //     if (isLoading) {
    //         return <p>Loading...</p>;
    //     }
    //     return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    // }

    // Unsupported file types
    return <p>Unsupported file type</p>;
}