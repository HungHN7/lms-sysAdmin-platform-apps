import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from 'src/utils/classnames';
import { IDataSidebar, dataSidebar } from './data.sidebar';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Logo, LogoOpen } from 'src/assets/icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Typography,
} from '../ui';
import { useStoreSelector } from 'src/hooks/useStoreSelector';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { useStoreDispatch } from 'src/hooks/useStoreDispatch';
import { logout } from 'src/redux/slices/user-slice';
import { useRoleArray } from 'src/hooks/useRoles';
import { Else, If, Then } from 'react-if';
import { ModalConfirm } from '../modal/modal-confirm';
import { SITE_MAP } from 'src/routes/site-map';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  toggleSidebar: () => void;
  open: boolean;
}
const ICON_SIZE = 20;
const Sidebar: React.FC<SidebarProps> = ({ className, toggleSidebar, open, ...props }) => {
  const dispatch = useStoreDispatch();
  const { pathname } = useLocation();
  const { user } = useStoreSelector((state) => state.userSlice);
  const [logoutConfirm, setLogoutConfirm] = React.useState(false);
  const [value, setvalue] = React.useState<string[]>(
    localStorage.getItem('menuKeys') ? JSON.parse(localStorage.getItem('menuKeys') as string) : [],
  );
  const navigate = useNavigate();
  // const [openAccordionKeys, setOpenAccordionKeys] = useState<string[]>([]);
  // const handleAccordionItemClick = (key: string) => {
  //   if (openAccordionKeys.includes(key)) {
  //     setOpenAccordionKeys(openAccordionKeys.filter((k) => k !== key));
  //   } else {
  //     setOpenAccordionKeys([...openAccordionKeys, key]);
  //   }
  // };

  const checkActive = (item: IDataSidebar) => {
    return item.isCheckCorrectly
      ? typeof item.active === 'string'
        ? pathname === item.active
        : item.active.some((it) => pathname === it)
      : typeof item.active === 'string'
        ? pathname.startsWith(item.active)
        : item.active.some((it) => pathname.startsWith(it));
  };

  const RenderSubSidebar = ({ item, level = 1 }: { item: IDataSidebar; level?: number }) => {
    const isResourcesPath = item.key === 'resources';
    const isCurriculum = item.active.includes('curriculum');

    return (
      useRoleArray(item.roles) &&
      (item.children && item.children.length > 0 ? (
        <Accordion
          type='multiple'
          className='w-full'
          key={item.link}
          // value={openAccordionKeys.includes(item.key) ? [item.key] : []}
          onValueChange={(value) => {
            open && setvalue(value);
            localStorage.setItem('menuKeys', JSON.stringify(value));
          }}
          {...(!open
            ? {
                value: [],
              }
            : {
                value: value,
              })}
        >
          <AccordionItem
            value={item.key}
            className='border-none'
          >
            <AccordionTrigger
              className={cn(
                'group flex items-center w-full h-[40px] pb-0 pl-6 pr-1 text-foreground text-[#ffffff] hover:bg-grey-9 hover:text-primary hover:no-underline [&[data-state=open]>button>button>svg]:rotate-180',
                checkActive(item) &&
                  //  openAccordionKeys.includes(item.key)
                  'border-primary group-hover:border-primary text-primary bg-grey-9',
              )}
              showArrow={false}
              // onClick={() => handleAccordionItemClick(item.key)}
              style={{
                paddingLeft: `${level > 1 ? level * 10 + ICON_SIZE : level * 20}px`,
              }}
            >
              <Popover {...(open && { open: false })}>
                <PopoverTrigger className='flex items-center w-full'>
                  <If condition={isCurriculum}>
                    <Then>
                      <p
                        className='flex-1 flex items-center'
                        // to={item.link} // Change to click Label open accordion
                        onClick={() => {
                          navigate(item.link);
                        }}
                      >
                        {item.icon && level === 1 && (
                          <div
                            className={cn(
                              'w-5 h-8 flex items-center justify-center text-[#ffffff] hover:bg-grey-9 hover:text-primary',
                              checkActive(item) &&
                                'border-primary group-hover:border-primary text-primary',
                            )}
                          >
                            <item.icon
                              fill={'none'}
                              className='group-hover:text-primary'
                            />
                          </div>
                        )}

                        {open && (
                          <span
                            className={cn(
                              'ml-5 text-sm truncate',
                              // checkActive(item) &&
                              //   'border-primary group-hover:border-primary text-primary',
                            )}
                          >
                            {item.label}
                          </span>
                        )}
                      </p>
                    </Then>
                    <Else>
                      <p className='flex-1 flex items-center'>
                        {item.icon && level === 1 && (
                          <div
                            className={cn(
                              'w-5 h-8 flex items-center justify-center text-[#ffffff] hover:bg-grey-9 hover:text-primary',
                              // checkActive(item) &&
                              //   'border-primary group-hover:border-primary text-primary',
                            )}
                          >
                            <item.icon
                              fill={'none'}
                              className='group-hover:text-primary'
                            />
                          </div>
                        )}

                        {open && (
                          <span
                            className={cn(
                              'ml-5 text-sm truncate',
                              // checkActive(item) &&
                              //   'border-primary group-hover:border-primary text-primary',
                            )}
                          >
                            {item.label}
                          </span>
                        )}
                      </p>
                    </Else>
                  </If>
                  <button
                    className={cn(
                      'w-fit h-10 flex items-center justify-center arrow',
                      open && 'w-10',
                      // checkActive(item) && 'text-primary',
                    )}
                  >
                    <ChevronDown className='w-5 h-5 shrink-0 transition-transform duration-200' />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align='center'
                  side='right'
                  className='w-[256px] bg-grey-9 !py-[10px] border-none rounded-none shadow-none'
                >
                  {item.children.map((item, index) => (
                    <RenderSubPopup
                      item={item}
                      key={index}
                    />
                  ))}
                </PopoverContent>
              </Popover>
            </AccordionTrigger>
            <AccordionContent>
              {item.children?.map((item, index) => (
                <RenderSubSidebar
                  item={item}
                  key={index}
                  level={level + 1}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <Link
          className={cn(
            'group flex items-center w-full h-[40px] px-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-background text-[#ffffff] hover:bg-grey-9 hover:text-primary font-normal',
            checkActive(item) &&
              'text-primary bg-grey-9 hover:text-primary hover:bg-grey-9 font-semibold',
          )}
          to={item.link}
          key={item.key}
          aria-label={item.label}
          state={isResourcesPath && { isResourcesPath }}
          style={{
            paddingLeft: `${level > 1 ? level * 10 + ICON_SIZE : level * 20}px`,
          }}
        >
          {item.icon && level === 1 && (
            <div
              className={cn(
                'w-5 h-8 flex items-center justify-center',
                checkActive(item) && 'border-primary group-hover:border-primary bg-grey-9',
              )}
            >
              <item.icon fill={'none'} />
            </div>
          )}

          <span className={cn('ml-5 text-sm visible truncate', !open && 'invisible')}>
            {item.label}
          </span>
        </Link>
      ))
    );
  };

  const RenderSubPopup = ({ item, level = 1 }: { item: IDataSidebar; level?: number }) => {
    const isResourcesPath = item.key === 'resources';
    return (
      useRoleArray(item.roles) &&
      (item.children && item.children.length ? (
        <Accordion
          type='multiple'
          className='w-full'
          key={item.link}
        >
          <AccordionItem
            value={item.key}
            className='border-none'
          >
            <AccordionTrigger
              className={cn(
                'group flex items-center w-full h-[40px] pb-0 px-2 rounded text-foreground text-[#ffffff] hover:bg-grey-9 hover:text-primary hover:no-underline [&[data-state=open]>button>button>svg]:rotate-180 !font-normal',
                // checkActive(item) && 'text-primary hover:text-primary !font-semibold',
              )}
            >
              <p
                className='flex-1 flex items-center '
                // to={item.link} // Change to click Label open accordion
              >
                <span className='ml-2 text-sm truncate'>{item.label}</span>
              </p>
            </AccordionTrigger>
            <AccordionContent
              style={{
                paddingLeft: `${level * 10}px`,
              }}
            >
              {item.children?.map((item, index) => (
                <RenderSubPopup
                  item={item}
                  key={index}
                  level={level + 1}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <>
          <Link
            className={cn(
              'group flex items-center w-full h-[40px] rounded px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-background text-[#ffffff] hover:bg-grey-9 hover:text-primary',
              checkActive(item) &&
                'text-primary hover:text-primary bg-grey-9 hover:bg-grey-9 font-semibold',
            )}
            to={item.link}
            state={isResourcesPath && { isResourcesPath }}
            key={item.key}
            aria-label={item.label}
          >
            <span className={cn('ml-2 text-sm visible truncate')}>{item.label}</span>
          </Link>
        </>
      ))
    );
  };

  return (
    <>
      <div
        className={cn(
          'flex flex-col w-full h-full border-r bg-[#353636] relative transition-width duration-500',
          className,
        )}
        {...props}
      >
        <div className='absolute w-6 h-6 top-6 -right-3'>
          <button
            className='w-6 h-6 rounded-full border border-[#353636] bg-white text-[#353636] flex items-center justify-center'
            onClick={toggleSidebar}
          >
            {!open ? <ChevronRight className='w-4 h-4' /> : <ChevronLeft className='w-4 h-4' />}
          </button>
        </div>
        <div className='px-6 py-4 flex items-center transition-none'>
          <Link
            className={cn('flex items-center w-full')}
            to='/'
          >
            <span className={cn('opacity-0 hidden', open && 'opacity-100 block')}>
              <LogoOpen />
            </span>
            <span className={cn('opacity-0 hidden', !open && 'opacity-100 block')}>
              <Logo />
            </span>
          </Link>
        </div>

        <ScrollArea
          className='h-full'
          classNameThumb='bg-[#626C7A]'
        >
          <div className='flex flex-col flex-1 w-full'>
            {dataSidebar.map((item) => (
              <RenderSubSidebar
                key={item.link}
                item={item}
              />
            ))}
          </div>
        </ScrollArea>

        <div className='flex flex-col justify-end w-full h-fit mt-auto'>
          {/* <div className='border-t border-grey-9'>
            <button
              className={cn('group flex items-center w-full h-12 px-6 text-[#ffffff]')}
              // onClick={handleSettingClick}
            >
              <div className={cn('flex items-center justify-center')}>
                <Settings size={20} />
              </div>
              {open && <span className='ml-2 text-sm'>Settings</span>}
            </button>
          </div> */}
          <div className='border-t border-grey-9'>
            <button
              className={cn('group flex items-center w-full h-12 px-6 text-[#ffffff]')}
              onClick={() => {
                setLogoutConfirm(true);
              }}
            >
              <div className={cn(' flex items-center justify-center')}>
                <RiLogoutBoxLine size={20} />
              </div>
              {open && <span className='ml-2 text-sm'>Logout</span>}
            </button>
          </div>

          <div
            className={cn(
              open ? 'px-6' : 'px-[10px]',
              'h-20 flex items-center border-t border-grey-9',
            )}
          >
            <Link
              to={SITE_MAP.PROFILE.path}
              className={cn(
                'group flex items-center w-full rounded text-white gap-4',
                !open && 'w-10',
              )}
            >
              <div className={cn('flex items-center justify-center rounded')}>
                <Avatar
                  className='w-12 h-12'
                  classNameFallback='w-12 h-12'
                  fallback={user?.last_name?.at(0) ?? 'A'}
                  src={user?.avatar}
                />
              </div>
              {open && (
                <div>
                  <div className='text-sm font-semibold capitalize truncate'>{`${user?.first_name} ${user?.last_name}`}</div>
                  <div className='text-xs'>Teacher</div>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>

      <ModalConfirm
        className='w-[400px]'
        classNameFooter='mt-4'
        open={logoutConfirm}
        setOpen={setLogoutConfirm}
        title={
          <Typography
            variant='h3'
            className='text-center'
          >
            Confirm logout
          </Typography>
        }
        message='Are you sure you want to log out?'
        cancel={{
          className: 'w-[100px]',
        }}
        action={{
          label: 'OK',
          className: 'w-[100px]',
          handle: () => {
            dispatch(logout());
          },
        }}
      />
    </>
  );
};

export default Sidebar;
