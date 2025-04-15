import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (

      <main className={styles.main}>
        {/* Hero Section */}
        <section className="hero-section py-5 bg-light">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="display-4 fw-bold mb-3">Simple Cook</h1>
                <p className="lead mb-4">
                  Discover delicious recipes for every occasion. From quick weeknight meals to special celebrations, 
                  find the perfect recipe to satisfy your cravings.
                </p>
                <div className="d-flex gap-3">
                  <Link href="/collection" className="btn btn-primary btn-lg">
                    Browse Recipes
                  </Link>
                  <Link href="/admin" className="btn btn-outline-secondary btn-lg">
                    Admin Panel
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 d-none d-lg-block">
                <div className="position-relative" style={{ height: "400px" }}>
                  <Image
                    src="/sizzling-pancake.jpg"
                    alt="Delicious food"
                    fill
                    style={{ objectFit: "cover", borderRadius: "10px" }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section py-5">
          <div className="container">
            <h2 className="text-center mb-5">Why Choose Simple Cook?</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card bg-light h-100 border-0 shadow">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="bi bi-book fs-1 text-primary"></i>
                    </div>
                    <h5 className="card-title">Curated Recipes</h5>
                    <p className="card-text">
                      Our collection features carefully selected recipes for all skill levels and dietary preferences.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-light h-100 border-0 shadow">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="bi bi-clock fs-1 text-primary"></i>
                    </div>
                    <h5 className="card-title">Quick & Easy</h5>
                    <p className="card-text">
                      Find recipes that fit your schedule, from quick 15-minute meals to weekend projects.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-light h-100 border-0 shadow">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="bi bi-people fs-1 text-primary"></i>
                    </div>
                    <h5 className="card-title">Community Driven</h5>
                    <p className="card-text">
                      Join our community of food enthusiasts and share your culinary adventures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  );
}
