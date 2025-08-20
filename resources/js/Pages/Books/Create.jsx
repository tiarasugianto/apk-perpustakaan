import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm, usePage } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({ auth }) {
    
    const { data, setData, post, errors } = useForm({
        title: '',
        author: '',
        publisher: '',
        year: '',
    });

    const handleStoreData = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('books.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Data buku telah ditambahkan!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Terjadi kesalahan saat menambahkan data buku.',
                    icon: 'error',
                    showConfirmButton: true,
                });
            },
        });


    };

    return (
        <AuthenticatedLayout
            user={auth.user}  // Menampilkan data user yang sedang login
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Buku</h2>}  // Judul halaman
        >
            <Head title={'Tambah Buku'} />  {/* Menentukan title halaman */}
            <Container>
                <Card title={'Tambah Buku Baru'}>  {/* Judul card */}
                    <form onSubmit={handleStoreData} method="POST">  {/* Formulir untuk input data buku */}
                        {/* Input untuk judul buku */}
                        <div className="mb-4">
                            <Input
                                label={'Judul Buku'}
                                type={'text'}
                                value={data.title ?? ''}
                                onChange={e => setData('title', e.target.value)}
                                errors={errors.title}
                                placeholder="Masukkan judul buku..."
                            />
                            {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                        </div>

                        {/* Input untuk penulis buku */}
                        <div className="mb-4">
                            <Input
                                label={'Penulis'}
                                type={'text'}
                                value={data.author ?? ''}
                                onChange={e => setData('author', e.target.value)}
                                errors={errors.author}
                                placeholder="Masukkan nama penulis..."
                            />
                            {errors.author && <span className="text-red-500 text-sm">{errors.author}</span>}
                        </div>

                        {/* penerbit */}
                        <div className="mb-4">
                            <Input
                                label={'Penerbit'}
                                type={'text'}
                                value={data.publisher ?? ''}
                                onChange={e => setData('publisher', e.target.value)}
                                errors={errors.publisher}
                                placeholder="Masukkan nama penerbit..."
                            />
                            {errors.author && <span className="text-red-500 text-sm">{errors.author}</span>}
                        </div>


                        {/* Input untuk tahun terbit */}
                        <div className="mb-4">
                            <Input
                                label={'Tahun Terbit'}
                                type={'number'}
                                value={data.year ?? ''}  // Pastikan ini konsisten
                                onChange={e => setData('year', e.target.value)}
                                errors={errors.year}
                                placeholder="Masukkan tahun terbit..."
                            />
                            {errors.publication_year && <span className="text-red-500 text-sm">{errors.publication_year}</span>}
                        </div>

                        {/* Tombol untuk submit dan membatalkan */}
                        <div className='flex items-center gap-2'>
                            <Button type={'submit'} />
                            <Button type={'cancel'} url={route('books.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}