import MainLayout from '@/components/MainLayout'
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

function MyApp({
    Component,
    pageProps: { session, ...pageProps }
}) {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap')
    }, [])

    return (
        <>
            <SessionProvider session={session}>
                <MainLayout>
                    <Component {...pageProps} />
                    <Toaster/>
                </MainLayout>
            </SessionProvider>
        </>
    )
}
export default MyApp
