import Link from "next/link"

const Header = ({currentUser})=>{

  const links = [
    !currentUser && {label: 'Sign up',href: '/auth/signup'},
    !currentUser && {label: 'Sign in',href: '/auth/signin'},
    currentUser && {label: 'Sell Tickets',href: '/tickets/new'},
    currentUser && {label: 'My Orders',href: '/Orders'},
    currentUser && {label: 'Sign Out',href: '/auth/signout'}
  ]
  .filter(linkConfig => linkConfig)
  .map(({label,href}) =>{
    return <li 
    className="nav-item"
    key={href}> 
     
     <Link href={href}>
      {label}
     </Link>
    </li>
  })

  return (
  <nav className="navbar navbar-light bg-light">
    <Link href="/" className="navbar-brand">
      Tix
    </Link>

    <div className="d-flex justify-content-end">
      <ul className="nav d-flex align-items-center">
        {links}
      </ul>
    </div>
  </nav>
  )
}

export default Header