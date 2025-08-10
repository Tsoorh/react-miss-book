import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"

const {useState } = React

export function RootCmp() {
    const [page, setPage] = useState('home')
    return (
            <section className="app main-layout">
                <AppHeader page={page} onSetPage={setPage} />
                <main>
                    <main>
                        {page === 'home' && <Home />}
                        {page === 'about' && <About />}
                    </main>
                </main>
            </section>
    )
}