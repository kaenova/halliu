import React from 'react'
import Link from 'next/link'

function DataError() {
  return (
    <div className='h-screen flex flex-col items-center mt-5 gap-2'>
      <svg xmlns="http://www.w3.org/2000/svg" width={30} viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="alert-circle"><rect width="24" height="24" opacity="0" /><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" /><circle cx="12" cy="16" r="1" /><path d="M12 7a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1z" /></g></g></svg>
      Gagal dalam mengambil data

      <Link href="/">
      <a className='btn btn-outline'>Kembali ke Laman Utama</a>
      </Link>
    </div>
  )
}

export default DataError