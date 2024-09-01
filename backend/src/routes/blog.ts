import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createPostInput, updatePostInput } from "../../../common/src/index";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    },
    Variables: {
        userId: string
    }
}>();


blogRouter.use("/*", async (c, next) => {
    const token = c.req.header("authorization");
    const userId: any = await verify(token || "", "secretsecret");
    if (userId) {
        c.set("userId", userId.id);
        await next();
    }
    else {
        c.status(403);
        return c.json({
            msg: "You are not signed in"
        });
    }

});

blogRouter.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());



    try {
        const body = await c.req.json();
        const { success } = createPostInput.safeParse({
            title: body.title,
            content: body.content,
        });
        if (!success) {
            return c.json({
                msh: "Invalid Inputs"
            })
        }
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get("userId")
            },

        });

        c.status(200);

        return c.json({
            post,
            postId: post.id
        });

    }
    catch (e) {
        c.status(411);
        return c.json({
            msg: "Cannot create the post"
        });
    }


})


blogRouter.put("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { success } = updatePostInput.safeParse({
            title: body.title,
            content: body.content,
        });
        if (!success) {
            return c.json({
                msh: "Invalid Inputs"
            })
        }
        const post = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            },

        });

        c.status(200);

        return c.json({
            post,
            msg: "Updated successfully",
            postId: post.id
        });

    }
    catch (e) {
        c.status(411);
        return c.json({
            msg: "Cannot create the post"
        });
    }


})


blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.findMany({
            select:{
                content: true,
                title: true,
                id: true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });
        if (!post) return c.json({
            msg: "post doesnt exist"
        })

        c.status(200);
        return c.json({
            post,
        });

    }
    catch (e) {
        c.status(411);
        return c.json({
            msg: "No Posts found"
        });
    }
})


blogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.findFirst({
            where: {
                id: c.req.param("id")
            },
            select:{
                content: true,
                title: true,
                id: true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });
        if (!post) return c.json({
            msg: "post doesnt exist"
        })

        c.status(200);

        return c.json({
            post,
        });

    }
    catch (e) {
        c.status(411);
        return c.json({
            msg: "Cannot create the post"
        });
    }
})

//to add pagination


