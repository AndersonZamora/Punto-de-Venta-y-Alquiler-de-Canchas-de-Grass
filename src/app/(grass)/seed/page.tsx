import { createUser } from "@/actions/see-create-user";

export default async function SeedPage() {

    const { message } = await createUser();

    return (
        <div>
            <h1>Hello Page create user: {message}</h1>
        </div>
    );
}