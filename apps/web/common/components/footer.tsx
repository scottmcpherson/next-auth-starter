const FooterLink = ({ href, title }: any) => (
  <li>
    <a
      className="text-base text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-500"
      href={href}
    >
      {title}
    </a>
  </li>
)

export default function Footer() {
  return (
    <footer className="">
      <div className="mx-auto max-w-7xl divide-y divide-gray-200 px-4 py-12 dark:divide-gray-700 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4">
          {/* Footer column 1 */}
          <div className="md:col-span-1">
            <h4 className="mb-4 text-3xl font-semibold text-gray-800 dark:text-gray-100">
              NextStarter
            </h4>
            <p className="text-base text-gray-500">
              An opinionated starter template for Next.js
            </p>
          </div>

          {/* Footer column 2 */}
          <div className="mt-12 md:col-span-1 md:mt-0">
            <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
              Product
            </h4>
            <ul className="space-y-2">
              <FooterLink href="/features" title="Features" />
              <FooterLink href="/pricing" title="Pricing" />
              <FooterLink href="/demo" title="Demo" />
            </ul>
          </div>

          {/* Footer column 3 */}
          <div className="mt-12 md:col-span-1 md:mt-0">
            <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
              Company
            </h4>
            <ul className="space-y-2">
              <FooterLink href="/about" title="About Us" />
              <FooterLink href="/careers" title="Careers" />
              <FooterLink href="/contact" title="Contact" />
            </ul>
          </div>

          {/* Footer column 4 */}
          <div className="mt-12 md:col-span-1 md:mt-0">
            <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100">
              Follow Us
            </h4>
            <ul className="space-y-2">
              <FooterLink href="https://twitter.com" title="Twitter" />
              <FooterLink href="https://linkedin.com" title="LinkedIn" />
              <FooterLink href="https://github.com" title="GitHub" />
            </ul>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between pt-10">
          <p className="text-base text-gray-400 dark:text-gray-400">
            &copy; {new Date().getFullYear()} NextStarter. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="/privacy"
              className="text-base text-gray-400 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-500"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-base text-gray-400 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-500"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
