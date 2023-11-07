import Signup from '../components/signup'

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="w-full md:w-96 px-4 mx-auto dark:text-gray-50">
        <Signup />
      </div>
    </div>
  )
}
