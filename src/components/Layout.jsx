import Header from "./Header";

const Layout = ({ children }) => {

  return (
    <main className="layout">
        <Header />
        {children}
    </main>
  )
}

export default Layout