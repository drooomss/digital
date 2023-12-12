"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Button } from "./ui/button"
import { User } from "@/payload-types"
import { DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu"
import Link from "next/link"
import { useAuth } from "../hoojs/use-auth"



const UserAccountNav = ({ user }: { user: User }) => {
    const { signOut } = useAuth()
    return <DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-visible" >
            <Button 
            variant='ghost' 
            size='sm' 
            className="relative font-bold">
                Mi cuenta
                </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-green-100 w-60 rounded-md shadow-2xl border border-black p-1" align="end">
            <div className="flex items-center justify-start gap-2 p-2 ">
                <div className="flex flex-col space-y-0.5 leading-none ">
                    <p className="'font-medium text-sm text-black">
                        {user.email}
                        </p>
                </div>
            </div>

            <DropdownMenuSeparator />

            {/* <DropdownMenuItem asChild>
                <Link href='/sell' className="cursor-pointer">Dashboard Vendedor</Link>
            </DropdownMenuItem> */}

            <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                Cerrar Sesión
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}

export default UserAccountNav