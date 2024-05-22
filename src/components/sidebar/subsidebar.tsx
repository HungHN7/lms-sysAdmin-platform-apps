import {
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Label,
} from '../ui';
import { ArrowLeft } from 'lucide-react';
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'src/providers/ThemeProvider';
import { cn } from 'src/utils/classnames';
import { clearToken } from 'src/utils/token';
interface SubSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  toggleSidebar: () => void;
  open: boolean;
  children?: ReactNode;
  isSetting?: boolean;
}
const SubSidebar: React.FC<SubSidebarProps> = ({
  isSetting,
  className,
  toggleSidebar,
  open,
  children,
}) => {
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'flex flex-col h-full top-0 display border-r overflow-hidden bg-background fixed transition-all box-border w-[260px] z-[2]',
        className,
        open ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className='px-4 pt-4 pb-3'>
        <Button
          variant='secondary'
          typeButton='ghost'
          size={'icon'}
          onClick={toggleSidebar}
        >
          <ArrowLeft />
        </Button>
      </div>
      {!isSetting && children}
      {isSetting && (
        <div className='flex flex-col w-full pb-3 px-4 space-y-4'>
          <Select
            value={theme}
            onValueChange={(value: 'light' | 'dark' | 'system') => setTheme(value)}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Light</SelectItem>
              <SelectItem value='dark'>Dark</SelectItem>
              <SelectItem value='system'>System</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              clearToken();
              navigate('/login');
            }}
          >
            Log out
          </Button>
        </div>
      )}
    </div>
  );
};

export default SubSidebar;
