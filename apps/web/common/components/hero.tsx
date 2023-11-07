export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bottom bg-no-repeat py-16 dark:border-b dark:border-gray-100/5 sm:py-24 lg:py-32">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl lg:text-6xl">
          <span className="block">Chat With</span>
          <span className="block text-indigo-600 dark:text-indigo-400 ">
            Your Database
          </span>
        </h1>
        <p className="success mt-3 text-center text-base text-gray-500 dark:text-theme-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
          <span className="block">
            Transform your SQL writing experience with TableChat&apos;s AI.
            Create complex queries in a fraction of the time.
          </span>
          <span className="block">
            Only 1000 early access spots available. Secure your spot and
            accelerate your workflow today!
          </span>
        </p>
        <div className="mt-10 w-full max-w-md sm:mt-12">
          <a
            href="#demo-section"
            className="link-primary mt-2 block text-center"
          >
            or check out the demo
          </a>
        </div>
      </div>
    </section>
  )
}
