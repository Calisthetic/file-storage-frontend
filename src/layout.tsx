import { Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex flex-col bg-backgroundLight dark:bg-backgroundDark w-full min-h-fulldvh items-center 
    justify-center text-xl space-y-2 text-textLight dark:text-textDark">
      <Link to="auth/signin">Авторизация</Link>
      <Link to="auth/nopassword">Авторизация без пароля</Link>
      <Link to="auth/signup">Регистрация</Link>
      <Link to="disk/upgrade">Самое главное</Link>
    </div>
  )
}