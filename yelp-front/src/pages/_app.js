import MainLayout from '@/components/MainLayout'
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </>
    )
}
export default MyApp
