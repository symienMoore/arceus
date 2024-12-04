import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const messagerouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({ message: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
        return ctx.db.message.create({
            data: {
                body: input.message, // assuming the correct field name is 'content'
            },
        });
        }),
    
    getLatest: publicProcedure.query(async ({ ctx }) => {
        const message = await ctx.db.message.findFirst({
        orderBy: { createdAt: "desc" },
        });
        return message ?? null;
    }),

    getAllById: publicProcedure.query(async ({ ctx }) => {
        const messages = await ctx.db.message.findFirst({
            
        })
    })
})