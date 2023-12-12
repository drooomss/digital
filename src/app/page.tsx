import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Navbar from '@/components/Navbar'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowDownToLine, Box, HeartHandshake } from 'lucide-react'
import { CheckCircle } from 'lucide-react'
import {Leaf} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const perks =[
  {
    name:"Retiro en sucursal",
    Icon: Box,
    description: "Get your assets delivered to your email in second and download them rigth now" 
  },
  {
    name:"Productos de Calidad",
    Icon: CheckCircle,
    description: "Calidad insuperable en Five Stars: estilo, durabilidad y confort excepcionales. Tu elección para una experiencia única."
  },
  {
    name:"Atención al Cliente",
    Icon: HeartHandshake,
    description: "Soporte al cliente disponible de Lunes a Viernes de 09:00 a 18:30. Estamos aquí para ayudarte en cualquier momento, respondiendo preguntas y resolviendo problemas para brindarte la mejor experiencia posible."
  },
]

export default function Home() {
  return (
    <>
      
      <MaxWidthWrapper>
       
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight text-green-500 sm:2xl:">
            ROPA Y CALZADO <br />
            {""}
            <span className="text-gray-900">AL POR MAYOR</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            ofrecemos una amplia selección de ropa y calzado de alta calidad a
            precios irresistibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Encuentra Tendencias
            </Link>
            <Button variant="ghost">Calidad Comprobada &rarr;</Button>
          </div>
        </div>
        
        {/* TODO: List Products */}
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-2">
          <div className="grid grid-col-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-8">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-green-200">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                    {/* Use perk.Icon directly and check if it exists before rendering */}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
      
    </>
  );
}

