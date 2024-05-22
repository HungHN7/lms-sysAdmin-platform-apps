import { LucideIcon } from 'lucide-react';
import { ElementType } from 'react';
// import {
//   CurriculumIcon,
//   IntegrationIcon,
//   LayoutIcon,
//   ManagementIcon,
//   ProductIcon,
//   // UserIcon,
// } from 'src/assets/icons';
import {
  ProductsIcon,
  ProgramIcon,
  ProgramSeriesIcon,
  ManagementIcon,
  // ProjectIcon,
} from 'src/assets/icons/sidebar';
import { ERoleType } from 'src/utils/constants/roles';

export interface IDataSidebar {
  key: string;
  link: string;
  icon?: LucideIcon | string | ElementType;
  label: string;
  active: string | string[];
  children?: IDataSidebar[];
  parentLabel?: string;
  isCheckCorrectly?: boolean;
  roles: ERoleType[]; // TODO: Temporary update
}
export const dataSidebar: IDataSidebar[] = [
  // Hide for release
  // {
  //   key: 'projects',
  //   link: '/author/projects',
  //   icon: ProjectIcon,
  //   label: 'Projects',
  //   active: '/author/projects',
  //   isCheckCorrectly: true,
  //   roles: [
  //     ERoleType.SUPER_ADMIN,
  //     ERoleType.TENANT_ADMIN,
  //     ERoleType.INT_SCHOOL,
  //     ERoleType.INT_TEACHER,
  //   ],
  // },

  {
    key: 'program-series',
    link: '/sys-admin/tenant-list',
    icon: ProgramSeriesIcon,
    label: 'Tenant Listttttttt',
    active: '/sys-admin/tenant-list',
    isCheckCorrectly: true,
    roles: [
      ERoleType.SUPER_ADMIN,
      ERoleType.TENANT_ADMIN,
      ERoleType.INT_SCHOOL,
      ERoleType.INT_TEACHER,
      ERoleType.TENANT_EDITOR,
    ],
  },
   

  // {
  //   key: 'management',
  //   link: '/tenant',
  //   icon: ManagementIcon,
  //   label: 'Management',
  //   active: ['/curriculum/metadata', '/tenant', '/int'],
  //   isCheckCorrectly: true,

  //   roles: [
  //     ERoleType.SUPER_ADMIN,
  //     ERoleType.TENANT_ADMIN,
  //     ERoleType.INT_SCHOOL,
  //     ERoleType.INT_TEACHER,
  //     ERoleType.INT_STUDENT,
  //   ],
  //   children: [
  //     {
  //       parentLabel: 'Tenant',
  //       key: 'tenant-user',
  //       link: '/tenant/users',
  //       label: 'User List',
  //       active: '/tenant/users',
  //       isCheckCorrectly: true,
  //       roles: [ERoleType.TENANT_ADMIN],
  //     },
  //     // {
  //     //   parentLabel: 'Tenant',
  //     //   key: 'role-permissions',
  //     //   link: '/tenant/access-control/permision',
  //     //   label: 'Role & Permission',
  //     //   active: '/tenant/access-control',
  //     //   isCheckCorrectly: true,
  //     //   roles: [ERoleType.TENANT_ADMIN],
  //     // },
  //     // {
  //     //   parentLabel: 'Tenant',
  //     //   key: 'role-permissions',
  //     //   link: '/tenant/master-data',
  //     //   label: 'Master Data',
  //     //   active: '/tenant/master-data',
  //     //   isCheckCorrectly: true,
  //     //   roles: [ERoleType.TENANT_ADMIN],
  //     // },
  //     {
  //       parentLabel: 'Tenant',
  //       key: 'role-permissions',
  //       link: '/curriculum/metadata',
  //       icon: '',
  //       label: 'Master Data',
  //       active: ['/curriculum/metadata', '/int'],
  //       // isCheckCorrectly: true,
  //       roles: [ERoleType.SUPER_ADMIN, ERoleType.TENANT_ADMIN],
  //       isCheckCorrectly: true,

  //       children: [
  //         {
  //           parentLabel: 'Metadata',
  //           key: 'grade',
  //           link: '/curriculum/metadata/grade',
  //           icon: '',
  //           label: 'Grade',
  //           active: '/curriculum/metadata/grade',
  //           roles: [ERoleType.SUPER_ADMIN, ERoleType.TENANT_ADMIN],
  //         },
  //         {
  //           parentLabel: 'Metadata',
  //           key: 'subject',
  //           link: '/curriculum/metadata/subject',
  //           icon: '',
  //           label: 'Subject',
  //           active: '/curriculum/metadata/subject',
  //           roles: [ERoleType.SUPER_ADMIN, ERoleType.TENANT_ADMIN],
  //         },
  //         {
  //           parentLabel: 'Metadata',
  //           key: 'content-type',
  //           link: '/curriculum/metadata/content-type',
  //           icon: '',
  //           label: 'Content Type',
  //           active: '/curriculum/metadata/content-type',
  //           roles: [ERoleType.SUPER_ADMIN, ERoleType.TENANT_ADMIN],
  //         },
  //         {
  //           parentLabel: 'Metadata',
  //           key: 'tag',
  //           link: '/curriculum/metadata/tag',
  //           icon: '',
  //           label: 'Tags',
  //           active: '/curriculum/metadata/tag',
  //           roles: [ERoleType.SUPER_ADMIN, ERoleType.TENANT_ADMIN],
  //         },
  //         {
  //           parentLabel: 'Metadata',
  //           key: 'document-list',
  //           link: '/int/case/document-list',
  //           icon: '',
  //           label: 'Standards',
  //           active: '/int/case/document-list',
  //           isCheckCorrectly: true,
  //           roles: [
  //             ERoleType.SUPER_ADMIN,
  //             ERoleType.TENANT_ADMIN,
  //             ERoleType.INT_SCHOOL,
  //             ERoleType.INT_TEACHER,
  //           ],
  //         },
  //         {
  //           parentLabel: 'CASE',
  //           key: 'state-list',
  //           link: '/int/case/state-list',
  //           icon: '',
  //           label: 'States',
  //           active: '/int/case/state-list',
  //           isCheckCorrectly: true,
  //           roles: [
  //             ERoleType.SUPER_ADMIN,
  //             ERoleType.TENANT_ADMIN,
  //             ERoleType.INT_SCHOOL,
  //             ERoleType.INT_TEACHER,
  //           ],
  //         },
  //       ],
  //     },
  //     // {
  //     //   parentLabel: 'Tenant',
  //     //   key: 'tenant-management',
  //     //   link: '/tenant/tenant-management',
  //     //   label: 'Tenant List',
  //     //   active: '/tenant/tenant-management',
  //     //   isCheckCorrectly: true,
  //     //   roles: [ERoleType.SUPER_ADMIN],
  //     // },
  //     // {
  //     //   parentLabel: 'Tenant',
  //     //   key: 'tenant-management',
  //     //   link: '/tenant/tenant-management',
  //     //   label: 'Tenant Settings',
  //     //   active: '/tenant/tenant-management',
  //     //   isCheckCorrectly: true,
  //     //   roles: [ERoleType.SUPER_ADMIN, ERoleType.TENANT_ADMIN],
  //     // },
  //     {
  //       parentLabel: 'Management',
  //       key: 'lti-consumers',
  //       link: '/int/lti/consumers',
  //       icon: '',
  //       label: 'LTI Consumers',
  //       active: '/int/lti/consumers',
  //       isCheckCorrectly: true,
  //       roles: [ERoleType.SUPER_ADMIN, ERoleType.TENANT_ADMIN],
  //     },
  //     {
  //       parentLabel: 'Management',
  //       key: 'lti-assignment-list',
  //       link: '/int/lti/assignment-list',
  //       icon: '',
  //       label: 'LTI Assignment List',
  //       active: '/int/lti/assignment-list',
  //       isCheckCorrectly: true,
  //       roles: [ERoleType.INT_SCHOOL, ERoleType.INT_TEACHER, ERoleType.INT_STUDENT],
  //     },
  //   ],
  // },
];
