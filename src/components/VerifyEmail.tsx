"use client"
import { trpc } from '@/trpc/client'
import { Loader2, XCircle } from 'lucide-react'
import Image from 'next/image'
import { buttonVariants } from './ui/button'
import Link from 'next/link'

interface VerifyEmailProps {
    token: string
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
    const {data, isLoading, isError} = trpc.auth.verifyEmail.useQuery({
        token,
    })

    if(isError) {
        return (
            <div className='flex flex-col items-center gap-2'>
            <XCircle className='h-8 w-8 text-red-600' />
            <h3 className='font-semibold text-xl'>
                Aquí hay un problema
            </h3>
            <p className='text-muted-foreground text-sm'>
                Este token no es valido o expiro.
                Intentalo de nuevo.
            </p>
        </div>
        )
    }
    if(data?.success) {
        return (
            <div className='flex h-full flex-col items-center justify-center'>
                <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
                    <Image 
                    src='/nav/mail_enviado.jpg'
                    fill
                    alt='El email fue enviado'
                    />
                </div>
                <h3 className='font-semibold text-2xl'>
                    Todo Listo
                </h3>
                <p className='text-muted-foreground text-center mt-1'>
                    Gracias por Verificar tu email
                    </p>
                <Link 
                className={buttonVariants({className: 'mt-4'})} 
                href='sign-in'>
                    Inicia Sesión
                    </Link>    
            </div>
        )
    }

    if(isLoading){
        return (
            <div className='flex flex-col items-center gap-2'>
            <Loader2 className='animate-spin h-8 w-8 text-zinc-300' />
            <h3 className='font-semibold text-xl'>
                Verificando...
            </h3>
            <p className='text-muted-foreground text-sm'>
                Esto puede tomar unos minutos
            </p>
        </div>
        )
    }
}

export default VerifyEmail 
