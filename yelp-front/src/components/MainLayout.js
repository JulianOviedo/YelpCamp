import Footer from './Footer'
import NavBar from './NavBar'

export default function MainLayout({ children }) {
    return (
        <>
            <div className='d-flex flex-column vh-100'>
                <NavBar/>
                <main className='container mt-5'>
                    {children}
                </main>
                <Footer/>
            </div>
        </>
    )
}
