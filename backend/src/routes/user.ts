import { Hono, Context, Next } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signInInput, signUpInput } from "../../../common/src/index";


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    }
}>();




userRouter.post('/signup', async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { success } = signUpInput.safeParse(body);
        if (!success) {
            return c.json({
                msh: "Invalid Inputs"
            })
        }
        const user = await prisma.user.create({
            data: body
        })
        console.log("Signed Up");
        const token = await sign({ id: user.id }, "secretsecret");
        return c.json({
            token: token
        });
    }
    catch (e) {
        c.status(411);
        return c.json({
            msg: "Invalid inputs"
        });
    }


})



userRouter.post('/signin', async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signUpInput.safeParse(body);
    if (!success) {
        throw Error ;
        return c.json({
            message: "Invalid Inputs"
        })
    }
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        }
    })

    if (!user) {
        c.status(403);
        return c.json({
            error: "User Not found"
        });
    }

    const jwt = await sign({ id: user.id }, "secretsecret");
    return c.json({
        token: jwt
    });
})