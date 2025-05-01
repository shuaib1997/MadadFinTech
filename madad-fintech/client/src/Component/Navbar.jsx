import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, 
  faCoins, 
  faUsers,
  faInfoCircle,
  faUser
} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Side - Brand & Main Navigation */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">MadadFinTech</span>
            
            <div className="hidden md:flex space-x-8 ml-10">
              <NavLink
                to="/dashboard"
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`
                }
              >
                <FontAwesomeIcon icon={faBuilding} className="mr-2 h-4 w-4" />
                Dashboard
              </NavLink>

              <NavLink
                to="/msme"
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`
                }
              >
                <FontAwesomeIcon icon={faCoins} className="mr-2 h-4 w-4" />
                MSME Portal
              </NavLink>

              <NavLink
                to="/lender"
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`
                }
              >
                <FontAwesomeIcon icon={faUsers} className="mr-2 h-4 w-4" />
                Lender Portal
              </NavLink>

              {/* Disabled About Link */}
              <button 
                disabled
                className="flex items-center px-3 py-2 text-gray-400 cursor-not-allowed"
                title="Coming soon"
              >
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2 h-4 w-4" />
                About
              </button>
            </div>
          </div>

           {/* Right Side - Combined Account Control */}
           <div className="flex items-center">
            <button 
              disabled
              className="flex items-center px-3 py-2 text-gray-400 cursor-not-allowed"
              title="Account features coming soon"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
