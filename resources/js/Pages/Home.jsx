// resources/js/Pages/Home.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Home({ auth }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-pink-700 leading-tight">Home</h2>}
        >
            <Head title="Home" />

            <div className="py-12 flex flex-col items-center justify-center bg-pink-50 min-h-screen">
                {/* Kotak dengan background image */}
                <div
                    className="relative w-80 h-48 rounded-lg shadow-md overflow-hidden bg-cover bg-center transform transition-transform duration-500 hover:scale-105 border-4 border-pink-200"
                    style={{ backgroundImage: "url('/images/library.png')" }}
                >
                    {/* Teks tanpa overlay hitam */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-pink-200 bg-opacity-70 px-4 py-2 rounded-lg">
                        <h1 className="text-pink-900 font-bold text-xl drop-shadow-md">
                            Perpustakaan Online
                        </h1>
                    </div>
                </div>

                {/* Kotak Soft Pink */}
                <div className="mt-8">
                    <p className="bg-pink-400 text-white px-8 py-3 rounded-md text-center font-semibold shadow-md">
                        Anda Telah Login
                    </p>
                </div>

                {/* Section Reviews */}
                <div className="mt-12 w-full max-w-3xl bg-pink-100 rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold text-pink-700 text-center mb-6">
                        Reviews Pengguna
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white border border-pink-200 rounded-lg p-4 shadow-sm">
                            <p className="text-pink-900 font-medium">✨ Buku-bukunya lengkap banget!</p>
                            <span className="text-sm text-pink-500">- Nabila</span>
                        </div>
                        <div className="bg-white border border-pink-200 rounded-lg p-4 shadow-sm">
                            <p className="text-pink-900 font-medium">💖 Desain websitenya cantik dan girly.</p>
                            <span className="text-sm text-pink-500">- Tiara</span>
                        </div>
                        <div className="bg-white border border-pink-200 rounded-lg p-4 shadow-sm">
                            <p className="text-pink-900 font-medium">📚 Mudah banget cari buku favorit.</p>
                            <span className="text-sm text-pink-500">- Maysya</span>
                        </div>
                        <div className="bg-white border border-pink-200 rounded-lg p-4 shadow-sm">
                            <p className="text-pink-900 font-medium">🌸 Warna soft pink bikin nyaman dipakai.</p>
                            <span className="text-sm text-pink-500">- Nissa</span>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
