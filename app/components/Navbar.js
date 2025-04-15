'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="container">
                <Link href="/" className="navbar-brand fw-bold">
                    Simple Cook
                </Link>

                <div className="navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/collection" className={`nav-link ${pathname === '/collection' ? 'active' : ''}`}>
                                Recipes
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/admin" className={`nav-link ${pathname.startsWith('/admin') ? 'active' : ''}`}>
                                Admin
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
} 