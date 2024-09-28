import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { credentialLogin, validateUser } from './actions';

interface DataTo {
    id: string
    name: string
    username: string
    status: boolean,
    role: string
}

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login'
    },

    callbacks: {
        async jwt({ token, user }) {
            //* verificar en la base de datos si el usuario sigue
            //* activo y su rol     

            if (user) {
                token.data = user;
            }

            const { username } = token?.data as DataTo;
            if (!username) return null;

            const result = await validateUser(username);

            if (!result) return null;

            token.data = result;

            return token;
        },

        session: ({ session, token }) => {
            session.user = token.data as any;
            return session;
        }
    },

    providers: [
        Credentials({
            async authorize(credentials) {
                
                const parsedCredentials = z
                    .object({ email: z.string().min(4), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;

                const user = await credentialLogin(email, password);

                if (!user) return null;
                
                return user;
            },
        }),
    ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);