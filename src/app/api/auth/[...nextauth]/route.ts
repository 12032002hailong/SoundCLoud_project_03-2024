import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { AuthOptions } from 'next-auth';
import { sendRequest } from "@/utils/api";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";


const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    // Configure one or more authentication providers
    providers: [

        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Hai Long",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Tên đăng nhập", type: "text", },
                password: { label: "Mật khẩu", type: "mật khẩu" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
                    method: 'POST',
                    body: {
                        username: credentials?.username,
                        password: credentials?.password
                    },
                })
                if (res && res.data) {
                    return res.data as any;
                } else {
                    throw new Error(res?.message as string);
                }


            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, trigger, user, account, profile }) {
            if (trigger === 'signIn' && account?.provider !== 'credentials') {
                //todo
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/social-media`,
                    method: 'POST',
                    body: { type: account?.provider?.toLocaleLowerCase(), username: user.email },
                })
                if (res.data) {
                    token.access_token = res.data?.access_token;
                    token.refresh_token = res.data?.refresh_token;
                    token.user = res.data?.user;
                }
            }
            if (trigger === 'signIn' && account?.provider === 'credentials') {
                //@ts-ignore
                token.access_token = user.access_token;
                //@ts-ignore
                token.refresh_token = user.refresh_token;
                //@ts-ignore
                token.user = user.user
            }
            return token;
        },
        session({ session, token, user }) {
            if (token) {
                session.access_token = token.access_token;
                session.refresh_token = token.refresh_token;
                session.user = token.user;
            }
            return session;
        }
    }, pages: {
        signIn: '/auth/signin'
    }
};

const handler = NextAuth(authOptions)


export { handler as GET, handler as POST, authOptions }