
import { auth } from "@/auth.config";
import { LogoutButton } from "@/components";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  if (session.user.role === 'admin') {
    redirect('/admin');
  }

  if (session.user.role === 'user') {
    redirect('/punto');
  }

  return (
    <div className="flex justify-center items-end text-center sm:block">

      <div className="bg-gray-500 transition-opacity bg-opacity-75"></div>
      <div className="inline-block text-left  rounded-lg overflow-hidden align-bottom transition-all transform shadow-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
        <div className="items-center w-full mr-auto ml-auto relative max-w-7xl md:px-12 lg:px-24">
          <div className="grid grid-cols-1">
            <div className="mt-4 mr-auto mb-4 ml-auto  max-w-lg">
              <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                <img
                  src="/logo.png"
                  className="flex-shrink-0 object-cover object-center btn- flex w-20 h-20 mr-auto -mb-8 ml-auto rounded-full shadow-xl"
                  alt={"Logo"}
                />

                <p className="mt-8 text-2xl font-semibold leading-none text-black tracking-tighter lg:text-3xl">
                  {session.user.name}
                </p>
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
