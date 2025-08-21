import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import { Head, useForm } from '@inertiajs/react';
import Input from '@/Components/Input';
import Button from '@/Components/Button';
import Card from '@/Components/Card';
import Swal from 'sweetalert2';

export default function Create({ auth, books, users }) {
    const { data, setData, post, errors } = useForm({
        user_id: '',
        book_id: '',
        date_loan: '',
        date_return: '',
        state: ''
    });

    const handleStoreData = (e) => {
        e.preventDefault();
        post(route('bookloans.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Data peminjaman buku berhasil ditambahkan!',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Terjadi kesalahan saat menambahkan peminjaman.',
                    icon: 'error',
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Peminjaman Buku</h2>}
        >
            <Head title="Tambah Peminjaman" />
            <Container>
                <Card title="Form Peminjaman Buku">
                    <form onSubmit={handleStoreData} method="POST">

                        {/* Pilih User */}
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">Peminjam</label>
                            <select
                                value={data.user_id}
                                onChange={e => setData('user_id', e.target.value)}
                                className="w-full border rounded p-2"
                            >
                                <option value="">-- Pilih User --</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            {errors.user_id && <span className="text-red-500 text-sm">{errors.user_id}</span>}
                        </div>

                        {/* Pilih Buku */}
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">Buku</label>
                            <select
                                value={data.book_id}
                                onChange={e => setData('book_id', e.target.value)}
                                className="w-full border rounded p-2"
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

                        {/* Tanggal Pinjam */}
                        <div className="mb-4">
                            <Input
                                label="Tanggal Pinjam"
                                type="date"
                                value={data.date_loan}
                                onChange={e => setData('date_loan', e.target.value)}
                                errors={errors.date_loan}
                            />
                        </div>

                        {/* Tanggal Kembali */}
                        <div className="mb-4">
                            <Input
                                label="Tanggal Kembali"
                                type="date"
                                value={data.date_return}
                                onChange={e => setData('date_return', e.target.value)}
                                errors={errors.date_return}
                            />
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                            <label className="block mb-2 font-medium">Status</label>
                            <select
                                value={data.state}
                                onChange={e => setData('state', e.target.value)}
                                className="w-full border rounded p-2"
                            >
                                <option value="">-- Pilih Status --</option>
                                <option value="dipinjam">Dipinjam</option>
                                <option value="dikembalikan">Dikembalikan</option>
                                <option value="terlambat">Terlambat</option>
                            </select>
                            {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
                        </div>

                        {/* Tombol */}
                        <div className="flex items-center gap-2">
                            <Button type="submit">Simpan</Button>
                            <Button type="cancel" url={route('bookloans.index')}>Batal</Button>
                        </div>
                    </form>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
}
