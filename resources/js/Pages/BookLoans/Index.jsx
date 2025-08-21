import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import { Head, usePage } from '@inertiajs/react';
import Search from '@/Components/Search';
import hasAnyPermission from '@/Utils/Permissions';

export default function Index({ auth }) {
    const { bookloans, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Book Loans</h2>}
        >
            <Head title="Book Loans" />
            <Container>
                <div className="mb-4 flex items-center justify-between gap-4">
                    {hasAnyPermission(['bookloans create']) &&
                        <Button type="add" url={route('bookloans.create')} />
                    }
                    <div className="w-full md:w-4/6">
                        <Search
                            url={route('bookloans.index')}
                            placeholder="Search book loans by user or book title..."
                            filter={filters}
                        />
                    </div>
                </div>

                <Table.Card title="Book Loans List">
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Pengguna</Table.Th>
                                <Table.Th>Buku</Table.Th>
                                <Table.Th>Tanggal Pinjam</Table.Th>
                                <Table.Th>Tanggal Kembali</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Aksi</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {bookloans.data.map((loan, index) => (
                                <tr key={loan.id}>
                                    <Table.Td>{++index + (bookloans.current_page - 1) * bookloans.per_page}</Table.Td>
                                    <Table.Td className="font-medium">{loan.user?.name}</Table.Td>
                                    <Table.Td>{loan.book?.title}</Table.Td>
                                    <Table.Td>{loan.date_loan}</Table.Td>
                                    <Table.Td>{loan.date_return ?? '-'}</Table.Td>
                                    <Table.Td>
                                        <span className={`px-2 py-1 rounded text-white text-sm
                                            ${loan.state === 'dipinjam' ? 'bg-blue-500' : 
                                              loan.state === 'dikembalikan' ? 'bg-green-500' : 
                                              'bg-red-500'}`}>
                                            {loan.state}
                                        </span>
                                    </Table.Td>
                                    <Table.Td>
                                        <div className="flex items-center gap-2">
                                            {hasAnyPermission(['bookloans edit']) &&
                                                <Button type="edit" url={route('bookloans.edit', loan.id)} />
                                            }
                                            {hasAnyPermission(['bookloans delete']) &&
                                                <Button type="delete" url={route('bookloans.destroy', loan.id)} />
                                            }
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Table.Card>

                <div className="flex items-center justify-center">
                    {bookloans.last_page !== 1 && <Pagination links={bookloans.links} />}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
