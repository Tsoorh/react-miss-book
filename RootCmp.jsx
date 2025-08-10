import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

const {useState} = React

export function RootCmp() {
    const [page, setPage] = useState('home')
    return (
            <section className="app main-layout">
                <AppHeader page={page} onSetPage={setPage} />
                <main>
                    <main>
                        {page === 'home' && <HomePage />}
                        {page === 'about' && <AboutUs />}
                        {page === 'books' && <BookIndex />}
                    </main>
                </main>
            </section>
    )
}