import { useForm } from '@inertiajs/react';
import { IconSearch } from '@tabler/icons-react';
import React from 'react'
 // Import semua yang dibutuhkan

 
export default function Search({url, placeholder}) {
    // membuat react functional component

    // didalamnya kita membuat sebuah state menggunakkan form helper yang disediakan inertia
    // define use form inertia
    const {data, setData, get} = useForm({
        search : '',
    })

    // membuat method baru handleSearchData
    // Untuk pencaharian data dan dijalankan ketika form di submit
    // define method searchData
    const handleSearchData = (e) => {
        e.preventDefault();

        get(`${url}?search=${data.search}`)
    }

    return (
        <form onSubmit={handleSearchData}>
            <div className='relative'>
                <input
                    type='text'
                    value={data.search}
                    onChange={e => setData('search', e.target.value)}
                    className='py-2 px-4 pr-11 block w-full rounded-lg text-sm border focus:outline-none focus:ring-0 focus:ring-gray-400 text-gray-700 bg-white border-gray-200 focus:border-gray-200'
                    placeholder={placeholder}/>
                <div className='absolute inset-y-0 right-0 flex items-center pointer-events-none pr-4'>
                    <IconSearch size={18} strokeWidth={1.5}/>
                </div>
            </div>
        </form>
    )
}