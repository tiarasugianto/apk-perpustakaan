import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Edit({ auth, category }) {
    const { data, setData, put, errors } = useForm({
        category: category.category || '',
    });

    const handleUpdateData = (e) => {
        e.preventDefault();
        put(route('categories.update', category.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Kategori berhasil diperbarui!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Terjadi kesalahan saat memperbarui kategori.',
                    icon: 'error',
                    showConfirmButton: true,
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Kategori</h2>}
        >
            <Head title={'Edit Kategori'} />
            <Container>
                <Card title={'Edit Kategori'}>
                    <form onSubmit={handleUpdateData} method="POST">
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
