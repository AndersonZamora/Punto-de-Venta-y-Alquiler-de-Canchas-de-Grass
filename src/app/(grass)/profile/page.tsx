import { DataProfile } from './ui/DataProfile';

export default function ProfilePage() {
    return (
        <div className='fade-in transition-all duration-300 bg-white p-2 md:p-4 rounded-lg shadow-md border-l-4 border-blue-600'>
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">Mi perfil</h2>
            <div className='w-full mb-12 xl:mb-0 px-2 md:px-4 mx-auto mt-4 w-12/12'>
                <DataProfile />
            </div>
        </div>
    );
}
