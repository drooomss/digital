"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import {toast} from 'sonner'
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

const router = useRouter()

const {mutate, isLoading} = 
trpc.auth.createPayloadUser.useMutation({
  onError: (err) => {
    if(err.data?.code === "CONFLICT") {
      toast.error(
        "Este Email ya esta en uso. Inicia sesion en su lugar"
        )
        return
    }
    if(err instanceof ZodError){
      toast.error(err.issues[0].message)
      
      return
    }

    toast.error('Algo esta saliendo mal. Intentalo denuevo')
  },
  onSuccess: ({sentToEmail}) => {
    toast.success(`Email de Verificacion enviado a ${sentToEmail}.`)
    router.push('/verify-email?to=' + sentToEmail)
  }

})

  const onSubmit = ({
     email, 
     password 
    }: TAuthCredentialsValidator) => {
    //Envia la data al servidor
    mutate({email, password})
  };

  return (
    <>
      <div className="container relative fle pt-10 flex-col items-center justify-center lg:px-0 ">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] rounded-2xl p-6 shadow-2xl">
          <div className="flex flex-col items-center space-y-2 text-center ">
            <Image
              src="/images/Diseño_sin_título-removebg-preview (1).png"
              width={200}
              height={10}
              alt="Picture of the author"
            />
            <h1 className="text-2xl font-bold">Crea Una Cuenta</h1>
            
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="email@ejemplo.com"
                  />  
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                      </p>
                  )}
                </div>

                
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="*******"
                  />
                   {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                      </p>
                  )}
                </div>

                <Button>Registrarse</Button>
                <Link
                  className={buttonVariants({
                    variant: "link",
                    className: "gap-1.5",
                  })}
                  href="/sign-in"
                >
                  Ya tienes una cuenta? Inicia Sesión
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
