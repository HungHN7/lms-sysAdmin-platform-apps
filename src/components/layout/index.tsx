import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar';
import { ScrollArea } from '../ui';
import { useState } from 'react';

const WITH_SIDEBAR_MAX = 256;
const WITH_SIDEBAR_MIN = 68;

const Layout = () => {
  const [open, setOpen] = useState(
    localStorage.getItem('sidebar') ? localStorage.getItem('sidebar') === 'true' : true,
  );

  const toggleSidebar = () => {
    localStorage.setItem('sidebar', !open ? 'true' : 'false');
    setOpen((prev) => !prev);
  };

  return (
    <div className='relative flex min-h-screen h-screen w-screen flex-col overflow-hidden'>
      <div className='flex h-full w-screen'>
        <Sidebar
          style={{ width: open ? WITH_SIDEBAR_MAX : WITH_SIDEBAR_MIN }}
          toggleSidebar={toggleSidebar}
          open={open}
          className='z-[3] sidebar'
        />
        <div
          className={`h-full z-[1]`}
          style={{
            width: `calc(100% - ${open ? WITH_SIDEBAR_MAX : WITH_SIDEBAR_MIN}px)`,
          }}
        >
          {/* <Header /> */}
          <ScrollArea className='w-full h-screen'>
            <section className='w-full min-h-[calc(100vh-3rem-9px)] h-full'>
              <Outlet />
            </section>
            {/* <Footer /> */}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Layout;
