import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({ auth, books, categories }) {
    const { data, setData, post, errors } = useForm({
        book_id: '',
        category_id: '',
    });

    const handleStoreData = (e) => {
        e.preventDefault();
        post(route('book_categories.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Book Category berhasil ditambahkan!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Terjadi kesalahan saat menambahkan data.',
                    icon: 'error',
                    showConfirmButton: true,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Book Category</h2>}
        >
            <Head title={'Tambah Book Category'} />
            <Container>
                <Card title={'Tambah Book Category Baru'}>
                    <form onSubmit={handleStoreData} method="POST">
                        {/* Select untuk buku */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Buku</label>
                            <select
                                value={data.book_id}
                                onChange={e => setData('book_id', e.target.value)}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
                            >
                                <option value="">-- Pilih Buku --</option>
                                {books.map(book => (
                                    <option key={book.id} value={book.id}>
                                        {book.title}
                                    </option>
                                ))}
                            </select>
                            {errors.book_id && <span className="text-red-500 text-sm">{errors.book_id}</span>}
                        </div>

                        {/* Select untuk kategori */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Kategori</label>
                            <select
                                value={data.category_id}
                                onChange={e => setData('category_id', e.target.value)}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-200"
                            >
                                <option value="">-- Pilih Kategori --</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.category}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && <span className="text-red-500 text-sm">{errors.category_id}</span>}
                        </div>

                        {/* Tombol */}
                        <div className='flex items-center gap-2'>
                            <Button type={'submit'} />
                            <Button type={'cancel'} url={route('book_categories.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
