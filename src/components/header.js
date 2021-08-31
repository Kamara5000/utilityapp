import { Link } from 'react-router-dom';
const Header= ()=>{
    return(
        <nav className="flex items-center justify-between flex-wrap bg-gray-300 p-6">
            <div className="flex items-center flex-no-shrink text-white mr-6">
                <span className="fa fa-tools fa-3x"></span>
                <span className="ml-2 font-semibold text-xl tracking-tight">Utility App</span>
            </div>
            
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
                    <span className="fa fa-bars"></span>
                </button>
            </div>
            
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                <Link to="/contact" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
                    Contact
                </Link>
                <Link  to="notes" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
                     Notes
                </Link>
                <Link to="todo" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white">
                    Todo
                </Link>
                </div>
                <div>
                    <button className="inline-block font-semibold text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal  mt-4 lg:mt-0">Sign Out</button>
                </div>
            </div>
        </nav>
    )
}

export default Header;