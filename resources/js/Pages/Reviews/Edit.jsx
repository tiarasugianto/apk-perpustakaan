import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Edit({ auth, review, books }) {
    const { data, setData, put, errors } = useForm({
        book_id: review.book_id || '',
        review: review.review || '',
        rating: review.rating || '',
    });

    const handleUpdateData = (e) => {
        e.preventDefault();
        put(route('reviews.update', review.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Review berhasil diperbarui!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Terjadi kesalahan saat memperbarui review.',
                    icon: 'error',
                    showConfirmButton: true,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Review</h2>}
        >
            <Head title={'Edit Review'} />
            <Container>
                <Card title={'Edit Review'}>
                    <form onSubmit={handleUpdateData} method="POST">
                        {/* Pilih Buku */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">Pilih Buku</label>
                            <select
                                value={data.book_id}
                                onChange={e => setData('book_id', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm"
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

                        {/* Review */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium text-gray-700">Review</label>
                            <textarea
                                value={data.review}
                                onChange={e => setData('review', e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm"
                                rows="4"
                                placeholder="Tulis ulasanmu..."
                            />
                            {errors.review && <span className="text-red-500 text-sm">{errors.review}</span>}
                        </div>

                        {/* Rating */}
                        <div className="mb-4">
                            <Input
                                label={'Rating (1-5)'}
                                type={'number'}
                                min="1"
                                max="5"
                                value={data.rating}
                                onChange={e => setData('rating', e.target.value)}
                                errors={errors.rating}
                                placeholder="Masukkan rating 1-5"
                            />
                        </div>

                        {/* Tombol */}
                        <div className='flex items-center gap-2'>
                            <Button type={'submit'} />
                            <Button type={'cancel'} url={route('reviews.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
