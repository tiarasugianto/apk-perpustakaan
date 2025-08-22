import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({ auth }) {
    const { data, setData, post, errors } = useForm({
        category: '',
    });

    const handleStoreData = (e) => {
        e.preventDefault();
        post(route('categories.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Kategori berhasil ditambahkan!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Terjadi kesalahan saat menambahkan kategori.',
                    icon: 'error',
                    showConfirmButton: true,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Kategori</h2>}
        >
            <Head title={'Tambah Kategori'} />
            <Container>
                <Card title={'Tambah Kategori Baru'}>
                    <form onSubmit={handleStoreData} method="POST">
                        {/* Input untuk kategori */}
                        <div className="mb-4">
                            <Input
                                label={'Nama Kategori'}
                                type={'text'}
                                value={data.category}
                                onChange={e => setData('category', e.target.value)}
                                errors={errors.category}
                                placeholder="Masukkan nama kategori..."
                            />
                            {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
                        </div>

                        {/* Tombol */}
                        <div className='flex items-center gap-2'>
                            <Button type={'submit'} />
                            <Button type={'cancel'} url={route('categories.index')} />
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
