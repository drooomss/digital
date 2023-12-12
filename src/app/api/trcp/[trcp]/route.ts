import { appRouter } from '@/trpc'
import {fetchRequestHandler} from '@trpc/server/adapters/fetch'


const handler = (req: Request) => {
    fetchRequestHandler({
        endpoint: "api/trpc",
        req,
        router: appRouter,

        //@ts-expect-error el contexto paso al middleware
        createContext: () => ({}),
    })

}

export {handler as GET, handler as POST}