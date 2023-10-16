import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/widgets/Header'

export const MainLayout = () => {

  return (
    <>
      <Header />
      <main>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
    </>
  )
}