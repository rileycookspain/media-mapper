import { z, ZodError } from 'zod';

const EnvSchema = z.object({
    NODE_ENV: z.string().default("development"),
    API_PORT: z.coerce.number().default(9999),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
    DATABASE_HOST: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_CA: z.string(),
    DATABASE_PORT: z.coerce.number(),
    //Consider removing this code, because with Supabase this isn't really necessary
}).superRefine((input, ctx) => {
    if (input.NODE_ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
        ctx.addIssue({
            code: z.ZodIssueCode.invalid_type,
            expected: "string",
            received: "undefined",
            path: ["DATABASE_AUTH_TOKEN"],
            message: "Must be set when NODE_ENV is 'production'",
        })
    }
})

export type env = z.infer<typeof EnvSchema>;

let env: env;

try {
    env = EnvSchema.parse(process.env);
} catch (e) {
    const error = e as ZodError;
    console.error("❌ Invalid env:")
    console.error(error.flatten().fieldErrors);
    process.exit(1);
}

export default env;