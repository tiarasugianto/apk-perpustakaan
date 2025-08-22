import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({ auth, books }) {
    const { data, setData, post, errors } = useForm({
        book_id: '',
    });

    const handleStoreData = (e) => {
        e.preventDefault();
        post(route('collections.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Buku berhasil ditambahkan ke koleksi!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Terjadi kesalahan saat menambahkan koleksi.',
                    icon: 'error',
                    showConfirmButton: true,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Koleksi</h2>}
        >
            <Head title={'Tambah Koleksi'} />
            <Container>
                <Card title={'Tambah Koleksi Baru'}>
                    <form onSubmit={handleStoreData} method="POST">
                        {/* Select untuk memilih buku */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pilih Buku
                            </label>
                            <select
                                className="w-full border rounded-lg p-2"
                                value={data.book_id}
                                onChange={e => setData('book_id', e.target.value)}
                            >
                                <option value="">-- Pilih Buku --</option>
                                {books.map((book) => (
                                    <option key={book.id} value={book.id}>
                                        {book.title}
                                    </option>
                                ))}
                            </select>
                            {errors.book_id && <span className="text-red-500 text-sm">{errors.book_id}</span>}
                        </div>

                        {/* Tombol */}
                        <div className='flex items-center gap-2'>
                            <Button type={'submit'} />
                            <Button type={'cancel'} url={route('collections.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
