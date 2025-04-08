import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './auth/AuthModal';
import { User } from 'lucide-react';

const UserMenu = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <AuthModal 
          triggerElement={
            <Button 
              size="sm" 
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-cyan-500 text-white hover:from-green-600 hover:to-cyan-600 border-0 shadow-md transition-all duration-300"
            >
              <User size={16} />
              <span>Sign In</span>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-cyan-50 hover:from-green-100 hover:to-cyan-100 border-green-200"
        >
          <User size={16} />
          <span>{user?.first_name || user?.username}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="w-full cursor-pointer">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile/favorites" className="w-full cursor-pointer">
            Favorites
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 focus:text-red-500">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
