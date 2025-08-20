import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Edit({ auth, book, collections, categories }) {
    const { data, setData, put, errors } = useForm({
        title: book.title || '',
        author: book.author || '',
        publisher: book.publisher || '',
        year: book.year || '',
    });

    const handleUpdateData = (e) => {
        e.preventDefault();

        put(route('books.update', book.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Data Buku berhasil diperbarui!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Terjadi kesalahan saat memperbarui buku.',
                    icon: 'error',
                    showConfirmButton: true
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Buku</h2>}
        >
            <Head title="Edit Buku" />
            <Container>
                <Card title="Edit Buku">
                    <form onSubmit={handleUpdateData}>
                        <div className='mb-4'>
                            <Input
                                label="Judul"
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                errors={errors.title}
                            />
                        </div>

                        <div className='mb-4'>
                            <Input
                                label="Penulis"
                                type="text"
                                value={data.author}
                                onChange={e => setData('author', e.target.value)}
                                errors={errors.author}
                            />
                        </div>

                        <div className='mb-4'>
                            <Input
                                label="Penerbit"
                                type="text"
                                value={data.publisher}
                                onChange={e => setData('publisher', e.target.value)}
                                errors={errors.author}
                            />
                        </div>

                        <div className='mb-4'>
                            <Input
                                label="Tahun Terbit"
                                type="number"
                                value={data.year}
                                onChange={e => setData('year', e.target.value)}
                                errors={errors.year}
                            />
                        </div>

                        

                        <div className="flex items-center gap-2">
                            <Button type="submit">Perbarui</Button>
                            <Button type="cancel" url={route('books.index')}>Batal</Button>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}