import { Box, Button, Container, Flex, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendLink, sendPDF } from "../lib/api";


const InputNotes = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<FormData>(new FormData());

    const {
        mutate: uploadPDF,
        isPending: isUploadingPDF,
        isError: isPDFError,
        error: pdfError
    } = useMutation({
        mutationFn: sendPDF
    })
    const {
        mutate: uploadLink,
        isPending: isUploadingLink,
        isError: isLinkError,
        error: linkError
    } = useMutation({
        mutationFn: sendLink
    })

    return (
        <Flex minH='100vh' align='center' justify='center'>
            <Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
                <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
                    {
                        isPDFError && (<Box mb={3} color='red.400'>
                            {
                                pdfError?.message || "An error occured"
                            }
                        </Box>
                        )}
                    {
                        isLinkError && (<Box mb={3} color='red.400'>
                            {
                                linkError?.message || "An error occured"
                            }
                        </Box>
                        )}
                    <Stack spacing={4}>
                        <FormControl id='pdfInput'>
                            <FormLabel>Select PDFs</FormLabel>
                            <Input type='file'
                                value={fileInputRef.current?.value}
                                onChange={(event) => {
                                    const file = event.target.files?.[0];
                                    if (file) {
                                        const newFormData = new FormData();
                                        newFormData.append("file", file);
                                        setFormData(newFormData);
                                    }
                                }}
                            />
                        </FormControl>
                        <Button my={2} isDisabled={!formData}
                            isLoading={isUploadingPDF}
                            onClick={
                                () => uploadPDF(formData)
                            }
                        >Upload PDF</Button>
                        <Button my={2} isDisabled={!formData}
                            isLoading={isUploadingLink}
                            onClick={
                                () => uploadLink()
                            }
                        >Use Google Classroom</Button>
                    </Stack>
                </Box>
            </Container>
        </Flex>
    )
}

export default InputNotes;
