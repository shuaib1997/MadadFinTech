import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCoins, faUsers } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">MadadFinTech</span>
          </div>
          
          <div className="flex space-x-8 items-center">
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
          </div>
        </div>
      </div>
    </nav>
  );
}
