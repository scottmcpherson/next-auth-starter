import Login from '../components/login'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="w-full md:w-96 px-4 mx-auto dark:text-slate-50">
        <Login />
      </div>
    </div>
  )
}
