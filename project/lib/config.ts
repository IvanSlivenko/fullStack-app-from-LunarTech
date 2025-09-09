const config = {
    env: {
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        apiEndpoint_2: process.env.NEXT_PUBLIC_API_ENDPOINT_2!,
        prodApiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        imageKit: {
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_KEY!,
            urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
                
        },
        databaseUrl: process.env.DATABASE_URL,
        upstash: {
            redisUrl: process.env.UPSTASH_REDIS_URL!,
            redisToken: process.env.UPSTASH_REDIS_TOKEN!,
            qstashUrl: process.env.QSTASH_URL!,
            qstashToken: process.env.QSTASH_TOKEN!,
        },
        resendToken: process.env.RESEND_TOKEN!,
    }
}

export default config;