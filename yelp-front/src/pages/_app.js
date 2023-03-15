import MainLayout from '@/components/MainLayout'
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap')
    }, [])

    return (
        <>
            <MainLayout>
                <Component {...pageProps} />
                <Toaster/>
            </MainLayout>
        </>
    )
}
export default MyApp
