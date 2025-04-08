import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { UserPlus, LogIn } from 'lucide-react';

interface AuthModalProps {
  triggerElement?: React.ReactNode;
  defaultTab?: 'login' | 'register';
  onSuccess?: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AuthModal = ({ 
  triggerElement, 
  defaultTab = 'login', 
  onSuccess,
  isOpen: controlledIsOpen,
  onOpenChange: controlledOnOpenChange 
}: AuthModalProps) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  
  // Determine if we're in controlled or uncontrolled mode
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;
  
  const handleOpenChange = (open: boolean) => {
    if (isControlled) {
      controlledOnOpenChange?.(open);
    } else {
      setUncontrolledIsOpen(open);
    }
  };

  const handleSuccess = () => {
    handleOpenChange(false);
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {triggerElement ? (
        <DialogTrigger asChild>
          {triggerElement}
        </DialogTrigger>
      ) : null}
      <DialogContent className="sm:max-w-[425px] border border-cyan-100 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold gradient-text">
            {activeTab === 'login' ? 'Welcome Back' : 'Create an Account'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === 'login' 
              ? 'Sign in to access your favorites and more.'
              : 'Join us to save your favorite destinations and experiences.'}
          </DialogDescription>
        </DialogHeader>

        <Tabs 
          defaultValue={activeTab} 
          className="w-full" 
          onValueChange={(value) => setActiveTab(value as 'login' | 'register')}
        >
          <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-green-500/10 to-cyan-500/10 p-1 gap-2 overflow-visible !h-auto">
            <TabsTrigger 
              value="login" 
              className="flex items-center justify-center gap-2 px-3 py-2 h-full whitespace-normal text-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              <LogIn className="h-4 w-4" /> Login
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="flex items-center justify-center gap-2 px-3 py-2 h-full whitespace-normal text-center data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              <UserPlus className="h-4 w-4" /> Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="pt-4">
            <LoginForm onSuccess={handleSuccess} />
          </TabsContent>
          <TabsContent value="register" className="pt-4">
            <RegisterForm onSuccess={handleSuccess} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
