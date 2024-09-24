import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { AuthDetail, Sidebar, TopMenu } from "@/components";

export default async function GassLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const session = await auth();

    if (!session?.user) {
        redirect('/auth/login')
    }

    return (
        <div className="flex h-screen bg-gray-200">
            <AuthDetail user={session.user} />
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <TopMenu />
                <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div className="px-3 py-8 mx-auto fade-in">
                        {children}
                    </div>
                </div>
            </div>

        </div>
    );
}