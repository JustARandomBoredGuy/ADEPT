import { Box, Button, Container, Flex, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendPDF } from "../lib/api";


const InputNotes = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<FormData>(new FormData());

    const {
        mutate: uploadPDF,
        isPending,
        isError,
        error
    } = useMutation({
        mutationFn: sendPDF
    })

    return (
        <Flex minH='100vh' align='center' justify='center'>
            <Container mx="auto" maxW="md" py={12} px={6} textAlign="center">
                <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
                    {
                        isError && (<Box mb={3} color='red.400'>
                            {
                                error?.message || "An error occured"
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
                            isLoading={isPending}
                            onClick={
                                () => uploadPDF(formData)
                            }
                        >Upload PDF</Button>
                    </Stack>
                </Box>
            </Container>
        </Flex>
    )
}

export default InputNotes;
