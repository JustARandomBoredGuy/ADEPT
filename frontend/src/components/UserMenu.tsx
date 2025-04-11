import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
// import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { removeToken } from "../lib/api"


const UserMenu = () => {
    const navigate = useNavigate()
    // const {
    //     mutate: logoutUser,
    //     error
    // } = useMutation({
    //     mutationFn: logout,
    //     onError: () => {
    //         alert(error?.message || "An error occurred")
    //     },
    //     onSettled: () => {
    //         queryClient.clear()
    //         alert("Logout successful")
    //         navigate("/login")
    //     }
    // })

    return (
        <Menu isLazy placement="right-start">
            <MenuButton position='fixed' left="1.5rem" bottom='1.5rem' zIndex={10}>
                <Avatar src='#' />
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
                <MenuItem onClick={() => navigate("/inputNotes")}>Add Notes</MenuItem>
                <MenuItem onClick={() => removeToken() }>Remove Token</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default UserMenu
