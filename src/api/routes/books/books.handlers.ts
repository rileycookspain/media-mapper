import type { ListRoute } from "@/api/routes/books/books.routes"
import type { HonoRouteHandler } from "@/api/lib/types"

export const list: HonoRouteHandler<ListRoute> = (c) => {
    return c.json([{
        name: "The Hitchhiker's Guide to the Galaxy",
        author: "Douglas Adams",
    }])
};