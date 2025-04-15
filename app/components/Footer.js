import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-light py-4 mt-5">
            <div className="container">
                <p className="text-center">
                    &copy; {new Date().getFullYear()} Simple Cook
                </p>
            </div>
        </footer>
    );
} 