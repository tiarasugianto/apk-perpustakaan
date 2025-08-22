import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import { Head, usePage } from '@inertiajs/react';
import Search from '@/Components/Search';
import hasAnyPermission from '@/Utils/Permissions';

export default function Index({ auth }) {
    // ambil props dari Inertia
    const { book_categories, filters } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            // judul halaman
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Book Categories</h2>}
        >
            <Head title={'Book Categories'} />

            <Container>
                <div className='mb-4 flex items-center justify-between gap-4'>
                    {hasAnyPermission(['book_categories create']) &&
                        <Button type={'add'} url={route('book_categories.create')} />
                    }
                    <div className='w-full md:w-4/6'>
                        <Search
                            url={route('book_categories.index')}
                            placeholder={'Search book categories by name...'}
                            filter={filters}
                        />
                    </div>
                </div>

                <Table.Card title={'Book Categories'}>
                    <Table>
                        <Table.Thead>
                            <tr>
                                <Table.Th>#</Table.Th>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {book_categories.data.map((bookCategory, i) => (
                                <tr key={bookCategory.id}>
                                    <Table.Td>
                                        {++i + (book_categories.current_page - 1) * book_categories.per_page}
                                    </Table.Td>
                                    <Table.Td>{bookCategory.book?.title}</Table.Td>
                                    <Table.Td>{bookCategory.category?.category}</Table.Td>
                                    <Table.Td>
                                        <div className='flex items-center gap-2'>
                                            {hasAnyPermission(['book_categories edit']) &&
                                                <Button type={'edit'} url={route('book_categories.edit', bookCategory.id)} />
                                            }
                                            {hasAnyPermission(['book_categories delete']) &&
                                                <Button type={'delete'} url={route('book_categories.destroy', bookCategory.id)} />
                                            }
                                        </div>
                                    </Table.Td>
                                </tr>
                            ))}
                        </Table.Tbody>

                    </Table>
                </Table.Card>

                <div className='flex items-center justify-center'>
                    {book_categories.last_page !== 1 && (
                        <Pagination links={book_categories.links} />
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
