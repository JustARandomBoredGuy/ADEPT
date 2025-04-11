import { Box, Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { sendImg } from "../lib/api";
import { useMutation } from "@tanstack/react-query";
import React from "react";


const SyllabusForm = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<FormData>(new FormData());
    const {
        mutate: uploadPDF,
        isPending,
        isError,
        error
    } = useMutation({
        mutationFn: sendImg,
        onSuccess: () => {
            window.location.reload()
        }
    })

    return (
        <>
            <Box rounded='lg' bg='gray.700' boxShadow='lg' p={8}>
                {
                    isError && (<Box mb={3} color='red.400'>
                        {
                            error?.message || "An error occured"
                        }
                    </Box>
                    )}
                <Stack spacing={4}>
                    <FormControl id='imgInput'>
                        <FormLabel>Select jpg file</FormLabel>
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
                    >Upload Syllabus</Button>
                </Stack>
            </Box>
        </>
    )
}

export default SyllabusForm;
