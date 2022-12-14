import Link from 'next/link';


const ExternalLink = ({ href, children }) => (
  <a
    className="text-sky-500 hover:text-sky-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-4 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link
            href="/"
            className="text-sky-500 hover:text-sky-600 transition"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sky-500 hover:text-sky-600 transition"
          >
            About
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="https://google.com">
            Linkedin
          </ExternalLink>
          <ExternalLink href="https://google.com">GitHub</ExternalLink>
        </div>
        <div className="flex flex-col space-y-4">
          <Link
            href="/blog"
            className="text-sky-500 hover:text-sky-600 transition"
          >
            Blog
          </Link>
          <Link
            href="/snippets"
            className="text-sky-500 hover:text-sky-600 transition"
          >
            Snippets
          </Link>
        </div>
      </div>
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-2" />
      <div className="w-full text-sky-900 dark:text-sky-200 flex pb-10">
        <span className='text-justify'>
          This blog has been made possible by a great work from&nbsp;
          <a className='font-semibold' href='https://leerob.io/'>Lee Robinson</a>.
          You can explore his work or a simplified version of it enabling this blog from&nbsp;
          <a className='font-semibold' href='https://github.com/rapour/afflu.xyz'>here</a>.
          </span>
      </div>
    </footer>
  );
}
