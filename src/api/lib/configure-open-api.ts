import type { HonoAppOpenAPI } from "@/api/lib/types"
import { Scalar } from "@scalar/hono-api-reference"
import packageJSON from "../../../package.json"

export default function configureOpenAPI(app: HonoAppOpenAPI) {
    app.doc("/doc", {
        openapi: "3.0.0",
        info: {
            version: packageJSON.version,
            title: "Books API"
        }
    }),

    app.get(
        '/reference',
        Scalar({
            theme: 'kepler',
            darkMode: true,
            layout: 'classic',
            defaultHttpClient: {
                targetKey: 'js',
                clientKey: 'fetch',
            },
            url: '/doc',
        })
    )
}