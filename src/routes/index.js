import React, { Suspense, lazy, useCallback } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'

import DashboardIcon from '@mui/icons-material/Dashboard'
import HomeWorkIcon from '@mui/icons-material/HomeWork'
import GroupIcon from '@mui/icons-material/Group'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import BookIcon from '@mui/icons-material/Book'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import HelpIcon from '@mui/icons-material/Help'
import { permissions } from '../settings/permissions'
import { useSelector } from 'react-redux'

import { AnimatePresence, motion } from 'framer-motion'

import { useEffect } from 'react'
import mobile from 'is-mobile'
import useWindowSize from '../hooks/useWindowSize'
import { Archive, Flag } from '@mui/icons-material'
import { AnalyticFormsIcon, DollarIcon, ShieldWithAvatarIcon } from '../assets/icons/icons'
import { ApplicationIcon, DoneAllIcon, LabaratoryIcon, PersonIcon } from '../assets/icons'
import {
  InspectorList,
  DocumentList,
  JournalList,
  JournalAdd,
  MonitoringList,
  MonitoringAdd,
  DocumentAdd,
  InstructionsList,
  InstructionsAdd,
  ViolationAdd,
  InstructionsView,
  InspectorEdit,
  DocumentEdit,
  JournalLenta,
  MonitoringEdit,
  ViolationEdit,
  Login,
  AuthJournalList,
  InspectorAdd,
  InspectorEditV2,
} from '../views'
import EmployeeList from '../views/Employee/EmployeeList'
import EmployeeEdit from '../views/Employee/EmployeeEdit'
import Faq from '../views/FAQ/Faq'
import Settings from '../views/Settings'
import Profile from '../views/Profile'
import { UsersDashboard } from '../views/Dashboard/UsersDashboard'
import { Basics } from '../views/Basics/BasicsList/Basics'
import { BasicsAdd } from '../views/Basics/BasicsAdd/BasicsAdd'
import { OperatorApplication } from '../views/Operator/OperatorApplication/OperatorApplication'
import { OperatorSteppers } from '../views/Operator/OperatorSteppers/OperatorSteppers'
import { AdministrativeAdmin } from '../views/AdministrativeAdmin'
import { Dashboard } from '../views'
import { OperatorObjects } from '../views/Operator/OperatorObjects/OperatorObjects'
import { OperatorHistory } from '../views/Operator/OperatorHistory/OperatorHistory'
import { CircularProgress } from '@mui/material'
import { ApplictionList } from '../views/Application/ApplicationList'
import MobileMonitoringAdd from '../views/MobileObjects/tabs/Monitoring/MobileMonitoringAdd'
import MobileViolationAdd from '../views/MobileRegulations/Regulation/ViolationAdd'
import MobileRegulations from '../views/MobileRegulations/Regulation/MobileRegulations'
import MobileregulationComment from '../views/MobileRegulations/Regulation/MobileRegulationComment'
import { Acceptance } from '../views/Employee/Acceptance'
import FormTables from '../views/Analytic/FormTables'
import FormTableUI from '../views/Analytic/FormTables/FormTableUI'
import { DocumentListV2 } from '../views/InspectorNewView/Documents/DocumentList'
import InspectorEditForm from '../views/InspectorNewView/inspectorEditForm'
import { MonitoringListV2 } from '../views/InspectorNewView/Monitoring/MonitoringList'
import { JournalListV2 } from '../views/InspectorNewView/Journal/JournalList'
import { InstructionsListV2 } from '../views/InspectorNewView/instructions/InstructionsList'
import PhotoReportsV2 from '../views/InspectorNewView/PhotoReports'
import DepartmentsV2 from '../views/InspectorNewView/Payment/Payment'
import { LabaratoryCalled } from '../views/Labaratory/LabaratoryCall/LabaratoryCalled'
const DocumentProtocolAdd = lazy(() => import('../views/Inspector/Documents/DocumentProtocolAdd'))
const DocumentActAdd = lazy(() => import('../views/Inspector/Documents/DocumentActAdd'))
const Statistics = lazy(() => import('../views/Statistics'))
const InstructionsComment = lazy(() => import('../views/Inspector/Instructions/InstructionsComment'))
const Registration = lazy(() => import('../views/Registration'))
const RegistrationAdd = lazy(() => import('../views/Registration/Add'))
const ByConfirmation = lazy(() => import('../views/ByConfirmation'))
const MobileObjects = lazy(() => import('../views/MobileObjects'))
const MobileObjectsEdit = lazy(() => import('../views/MobileObjects/edit'))
const MobilePhotoReport = lazy(() => import('../views/MobileObjects/tabs/MobilePhotoReport'))
const FaqAdd = lazy(() => import('../views/FAQ/FaqAdd'))
const MobileProfile = lazy(() => import('../views/MobileProfile'))
const SettingsTime = lazy(() => import('../views/Settings/Time'))
const CheckListAdd = lazy(() => import('../views/Settings/CheckListAdd'))
const ParticipantAdd = lazy(() => import('../views/Inspector/ParticipantAdd'))
const RegistrationAcceptance = lazy(() => import('../views/Registration/Acceptance'))
const LibraryAdd = lazy(() => import('../views/Library/LibraryAdd'))
const Library = lazy(() => import('../views/Library'))
const PhotoReports = lazy(() => import('../views/PhotoReports'))
const RequisitesList = lazy(() => import('../views/Settings/Requisites'))
const RequisitesEdit = lazy(() => import('../views/Settings/Requisites/Edit'))
const RolesList = lazy(() => import('../views/Settings/Roles'))
const Fields = lazy(() => import('../views/Settings/Fields'))
const FieldsEdit = lazy(() => import('../views/Settings/Fields/Edit'))
const FieldsList = lazy(() => import('../views/Settings/Fields/List'))
const RolesEdit = lazy(() => import('../views/Settings/Roles/Edit'))
const SettingsOthers = lazy(() => import('../views/Settings/Others'))
const FallbackPage = lazy(() => import('../views/FallbackPage'))
const EmployeeAdding = lazy(() => import('../views/Employee/EmployeeAdding'))
const SearchEngine = lazy(() => import('../views/Registration/SearchEngine'))
const MobileRegulationView = lazy(() => import('../views/MobileRegulations/Regulation/MobileRegulationView'))
const Labaratory = lazy(() => import('../views/Labaratory/Labaratory'))
const MobileJournalLenta = lazy(() => import('../views/MobileObjects/tabs/MobileJournalLenta'))
const PaymentAdd = lazy(() => import('../views/Labaratory/LabaratoryObjects/Payment/PaymentAdd'))
const ApplicationAllInformation = lazy(() => import('../views/Application/ApplicationInformation/AllInformation'))
const ApplicationDepartments = lazy(() => import('../views/Application/ApplicationInformation/Departments'))
const ApplicationPayment = lazy(() => import('../views/Application/ApplicationInformation/Payment'))
const ApplicationCompletdedWorks = lazy(() => import('../views/Application/ApplicationInformation/CompletedWorks'))
const MobileProrabAdd = lazy(() => import('../views/MobileObjects/tabs/MobileProrabAdd'))
const Clarification = lazy(() => import('../views/Registration/Clarification'))
const RotationEdit = lazy(() => import('../views/Employee/RotationEdit'))
const JournalView = lazy(() => import('../views/Inspector/Journal/JournalView'))
const Users = lazy(() => import('../views/Dashboard/Users'))
const LaboratoryTestTypesList = lazy(() => import('../views/Labaratory/LaboratorySettings/LaboratoryTestTypes/List'))
const LaboratoryTestTypeAdd = lazy(() => import('../views/Labaratory/LaboratorySettings/LaboratoryTestTypes/AddForm'))
const MesurementUnitsList = lazy(() => import('../views/Labaratory/LaboratorySettings/MeasurementUnits/List'))
const MesurementUnitsAdd = lazy(() => import('../views/Labaratory/LaboratorySettings/MeasurementUnits/AddForm'))
const LabaratoryApplicationAdd = lazy(() => import('../views/Labaratory/LabaratoryApplicationAdd'))
const ApplicationInformation = lazy(() => import('../views/Application/ApplicationInformation'))
const DashboardBuxgalter = lazy(() => import('../views/Dashboard/Buxgalter'))
const DashboardBuxgalterMain = lazy(() => import('../views/Dashboard/Buxgalter/Main'))
const ArchiveListPage = lazy(() => import('../views/Dashboard/Buxgalter/ArchivePage'))
const TypeList = lazy(() => import('../views/Library/TypeList'))
const RepublicDashboard = lazy(() => import('../views/Dashboard/Republic'))
const DashboardObjects = lazy(() => import('../views/Dashboard/AreaList'))
const RepublicDashboardTable = lazy(() => import('../views/Dashboard/AreaList/Table'))
const RepublicDashboardObjectTable = lazy(() => import('../views/Dashboard/ObjectList/Table'))
const RepublicDashboardUserTable = lazy(() => import('../views/Dashboard/UserList/Table'))
export const routes = [
  {
    title: 'Analitika',
    path: 'dashboard-republic',
    icon: (color) => <DashboardIcon htmlColor={color} fontSize="small" />,
    permission: 'DASHBOARD_REPUBLIC',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RepublicDashboard />
          </Suspense>
        ),
        permission: 'DASHBOARD_REPUBLIC',
      },
      {
        path: 'objects/:analyticSection',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <DashboardObjects type="objects" />
          </Suspense>
        ),
        permission: 'DASHBOARD_REPUBLIC',
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <RepublicDashboardTable />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
          {
            path: 'list',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <RepublicDashboardObjectTable />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
        ],
      },
      {
        path: 'objects/:analyticSection/list/:id/calendar/:taskId',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <UsersDashboard />
          </Suspense>
        ),
        permission: 'USER/FOREMAN/DASHBOARD',
      },
      {
        path: 'objects/:analyticSection/list',
        permission: 'DASHBOARD_REPUBLIC',
        children: [
          {
            path: ':id',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <InspectorEdit />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
          {
            path: ':id/monitoring',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <MonitoringList />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
          {
            path: ':id/documents',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <DocumentList />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
          {
            path: ':id/journal',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <JournalList />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
          {
            path: ':id/instructions',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <InstructionsList />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
          {
            path: ':id/photo-reports',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <PhotoReports />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
          {
            path: ':id/payment',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <ApplicationPayment />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
        ],
      },
      {
        path: 'users/:analyticSection',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <DashboardObjects type="users" />
          </Suspense>
        ),
        permission: 'DASHBOARD_REPUBLIC',
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <RepublicDashboardTable />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
          {
            path: 'list',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <RepublicDashboardUserTable />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
          {
            path: 'list/:userId',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <RepublicDashboardObjectTable />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
        ],
      },
      {
        path: 'users/:analyticSection/list/:userId',
        permission: 'DASHBOARD_REPUBLIC',
        children: [
          {
            path: ':id',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <InspectorEdit />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
          {
            path: ':id/monitoring',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <MonitoringList />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
          {
            path: ':id/documents',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <DocumentList />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
          {
            path: ':id/journal',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <JournalList />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
          {
            path: ':id/instructions',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <InstructionsList />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
          {
            path: ':id/photo-reports',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <PhotoReports />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
          {
            path: ':id/payment',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <ApplicationPayment />
              </Suspense>
            ),
            permission: 'DASHBOARD_REPUBLIC',
          },
        ],
      },
    ],
  },
  {
    title: 'Bosh sahifa',
    path: 'dashboard',
    icon: (color) => <DashboardIcon htmlColor={color} fontSize="small" />,
    permission: 'DASHBOARD',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Dashboard />
          </Suspense>
        ),
        permission: 'DASHBOARD/LIST',
      },
      {
        path: ':userRole',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Users />
          </Suspense>
        ),
        permission: 'DASHBOARD/USER/ROLES',
      },
      {
        path: 'registered/:userRole',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Users />
          </Suspense>
        ),
        permission: 'DASHBOARD/USER/ROLE',
      },
      {
        path: 'objects/:objectType',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <InspectorList />
          </Suspense>
        ),
        permission: 'DASHBOARD/OBJECT/TYPE',
      },
      {
        path: 'inspector/:id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <InspectorList />
          </Suspense>
        ),
        permission: 'DASHBOARD/INSPEKTOR',
      },
    ],
  },
  {
    title: 'Bosh sahifa',
    path: 'user-dashboard',
    icon: (color) => <DashboardIcon htmlColor={color} fontSize="small" />,
    permission: 'USER/DASHBOARD',
    mobile: true,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <UsersDashboard />
          </Suspense>
        ),
        permission: 'USER/DASHBOARD',
      },
    ],
  },
  {
    title: 'Bosh sahifa',
    path: 'user-dashboard',
    icon: (color) => <DashboardIcon htmlColor={color} fontSize="small" />,
    permission: 'USER/DASHBOARD',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <UsersDashboard />
          </Suspense>
        ),
        permission: 'USER/DASHBOARD',
      },
    ],
  },
  {
    title: 'Bosh sahifa',
    path: 'dashboard-buxgalter',
    icon: (color) => <DashboardIcon htmlColor={color} fontSize="small" />,
    permission: 'DASHBOARD_BUXGALTER',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <DashboardBuxgalter />
          </Suspense>
        ),
        permission: 'DASHBOARD_BUXGALTER',
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <DashboardBuxgalterMain />
              </Suspense>
            ),
            permission: 'DASHBOARD_BUXGALTER',
          },
        ],
      },
    ],
  },
  {
    path: 'analyst',
    title: 'Asoslar',
    icon: (color) => <AnalyticFormsIcon color={color} />,
    permission: 'ANALYST',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <FormTables />
          </Suspense>
        ),
        permission: 'ANALYST',
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <FormTableUI />
              </Suspense>
            ),
            permission: 'ANALYST',
          },
          {
            path: 'table2/:formId',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <FormTableUI />
              </Suspense>
            ),
            permission: 'ANALYST',
          },
          {
            path: 'objectlist/:formId/:regionId',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <RepublicDashboardObjectTable />
              </Suspense>
            ),
            permission: 'ANALYST',
          },
          {
            path: 'objectlist/:formId/:regionId/:id',
            permission: 'DASHBOARD_REPUBLIC',
            children: [
              {
                path: '',
                element: (
                  <Suspense fallback={<CircularProgress />}>
                    <InspectorEditV2 />
                  </Suspense>
                ),
                permission: 'DASHBOARD_REPUBLIC',
                children: [
                  {
                    path: '',
                    element: (
                      <Suspense fallback={<CircularProgress />}>
                        <InspectorEditForm />
                      </Suspense>
                    ),
                    permission: 'DASHBOARD_REPUBLIC',
                  },
                  {
                    path: 'documents',
                    element: (
                      <Suspense fallback={<CircularProgress />}>
                        <DocumentListV2 />
                      </Suspense>
                    ),
                    permission: 'DASHBOARD_REPUBLIC',
                  },
                  {
                    path: 'monitoring',
                    element: (
                      <Suspense fallback={<CircularProgress />}>
                        <MonitoringListV2 />
                      </Suspense>
                    ),
                    permission: 'DASHBOARD_REPUBLIC',
                  },
                  {
                    path: 'journal',
                    element: (
                      <Suspense fallback={<CircularProgress />}>
                        <JournalListV2 />
                      </Suspense>
                    ),
                    permission: 'DASHBOARD_REPUBLIC',
                  },
                  {
                    path: 'instructions',
                    element: (
                      <Suspense fallback={<CircularProgress />}>
                        <InstructionsListV2 />
                      </Suspense>
                    ),
                    permission: 'DASHBOARD_REPUBLIC',
                  },
                  {
                    path: 'photo-reports',
                    element: (
                      <Suspense fallback={<CircularProgress />}>
                        <PhotoReportsV2 />
                      </Suspense>
                    ),
                    permission: 'DASHBOARD_REPUBLIC',
                  },
                  {
                    path: 'payment',
                    element: (
                      <Suspense fallback={<CircularProgress />}>
                        <DepartmentsV2 />
                      </Suspense>
                    ),
                    permission: 'DASHBOARD_REPUBLIC',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  //inchi nazoratchi ga object page
  {
    path: 'm/objects',
    //hide: true,
    title: 'Obyektlar',
    mobile: true,
    icon: (color) => <HomeWorkIcon htmlColor={color} fontSize="small" />,
    permission: 'ICHKI_NAZ_MOBILE/OBJECTS',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileObjects />
          </Suspense>
        ),
        permission: 'ICHKI_NAZ_MOBILE/OBJECTS',
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileObjectsEdit />
          </Suspense>
        ),
        permission: 'ICHKI_NAZ_MOBILE/OBJECTS',
      },
    ],
  },
  {
    path: 'm/objects',
    //hide: true,
    title: 'Obyektlar',
    mobile: true,
    icon: (color) => <HomeWorkIcon htmlColor={color} fontSize="small" />,
    permission: 'MOBILE/OBJECTS',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileObjects />
          </Suspense>
        ),
        permission: 'MOBILE/OBJECTS/LIST',
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileObjectsEdit />
          </Suspense>
        ),
        permission: 'MOBILE/OBJECTS/EDIT',
      },
      {
        path: ':id/monitoring/add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileMonitoringAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/MONITORING/ADD',
      },
      {
        path: ':id/instruction/:instruction_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileRegulationView />
          </Suspense>
        ),
        permission: 'MOBILE/OBJECTS/REGULATION/VIEW',
      },
      {
        path: ':id/instructions/view/:instruction_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileRegulationView />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/VIEW',
      },
      {
        path: ':id/instructions/view/:instruction_id/violation/add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileViolationAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/VIEW',
      },
      {
        path: ':id/instructions/:instruction_id/violation/:violation_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileViolationAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/VIOLATIONS/EDIT',
      },
      {
        path: ':id/instructions/:instruction_id/violation/monitoring/:violation_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileViolationAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/VIOLATIONS/MONITORING/EDIT',
      },
      {
        path: ':id/journal/:journal_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileJournalLenta />
          </Suspense>
        ),
        permission: 'MOBILE/OBJECTS/REGULATION/VIEW',
      },
      {
        path: ':id/author-journal/:journal_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileJournalLenta />
          </Suspense>
        ),
        permission: 'MOBILE/OBJECTS/REGULATION/VIEW',
      },
      {
        path: ':id/prorab-add/:passport_number',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileProrabAdd />
          </Suspense>
        ),
        permission: 'MOBILE/OBJECTS/REGULATION/VIEW',
      },
    ],
  },
  {
    path: 'm/objects-archieve',
    hide: true,
    permission: 'MOBILE/OBJECTS',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileObjects />
          </Suspense>
        ),
        permission: 'MOBILE/OBJECTS/LIST',
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileObjectsEdit />
          </Suspense>
        ),
        permission: 'MOBILE/OBJECTS/EDIT',
      },
    ],
  },
  {
    path: 'm/reports',
    hide: true,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <MobilePhotoReport />
      </Suspense>
    ),
    permission: 'MOBILE/REPORTS',
  },
  {
    path: 'm/profile',
    hide: true,
    element: (
      <Suspense fallback={<CircularProgress />}>
        <MobileProfile />
      </Suspense>
    ),
    permission: 'MOBILE/PROFILE',
  },
  {
    path: 'm/faq',
    hide: true,
    permission: 'MOBILE/FAQ',
    element: (
      <Suspense fallback={<CircularProgress />}>
        <Faq />
      </Suspense>
    ),
  },
  {
    title: "Ro'yxatdan o'tish",
    path: 'registration',
    icon: (color) => <AccessTimeIcon htmlColor={color} fontSize="small" />,
    permission: 'REGISTRATION',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Registration />
          </Suspense>
        ),
        permission: 'REGISTRATION/LIST',
      },
      {
        path: 'add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RegistrationAdd />
          </Suspense>
        ),
        permission: 'REGISTRATION/ADD',
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RegistrationAdd />
          </Suspense>
        ),
        permission: 'REGISTRATION/EDIT',
      },
      {
        path: 'linear/:id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RegistrationAdd />
          </Suspense>
        ),
        permission: 'HISTORY/ADD',
      },
      {
        path: 'acceptance/:id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RegistrationAcceptance />
          </Suspense>
        ),
        permission: 'REGISTRATION/ACCEPTANCE/EDIT',
      },
      {
        path: ':id/clarification',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Clarification />
          </Suspense>
        ),
        permission: 'REGISTRATION/ACCEPTANCE/EDIT',
      },
      {
        path: ':id/clarification-linear',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Clarification />
          </Suspense>
        ),
        permission: 'REGISTRATION/ACCEPTANCE/EDIT',
      },
    ],
  },
  {
    title: 'Arizalar',
    path: 'applications',
    icon: (color) => <AccessTimeIcon htmlColor={color} fontSize="small" />,
    permission: 'OPERATOR/APPLICATION',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <OperatorApplication />
          </Suspense>
        ),
        permission: 'OPERATOR/APPLICATION/LIST',
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <OperatorSteppers />
          </Suspense>
        ),
        permission: 'OPERATOR/APPLICATION/STEPPERS',
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <OperatorSteppers />
          </Suspense>
        ),
        permission: 'OPERATOR/APPLICATION/LIST/ADMIN',
      },
      {
        path: ':id/inspector',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <OperatorSteppers />
          </Suspense>
        ),
        permission: 'OPERATOR/APPLICATION',
      },
      {
        path: ':id/objects/:cadastral_number',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <OperatorObjects />
          </Suspense>
        ),
        permission: 'OPERATOR/APPLICATION/OBJECTS',
      },
      {
        path: ':id/objects/:cadastral_number/:object_id/inspector',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <OperatorSteppers />
          </Suspense>
        ),
        permission: 'OPERATOR/APPLICATION',
      },
    ],
  },
  {
    title: 'Arxiv',
    path: 'history',
    icon: (color) => <HistoryOutlinedIcon htmlColor={color} fontSize="small" />,
    permission: 'OPERATOR/HISTORY/LIST',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <OperatorHistory />
          </Suspense>
        ),
        permission: 'OPERATOR/APPLICATION/LIST/HISTORY',
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <OperatorSteppers />
          </Suspense>
        ),
        permission: 'OPERATOR/APPLICATION/LIST',
      },
    ],
  },
  {
    title: 'Tarix',
    path: 'history',
    icon: (color) => <HistoryOutlinedIcon htmlColor={color} fontSize="small" />,
    permission: 'HISTORY',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Registration />
          </Suspense>
        ),
        permission: 'HISTORY/LIST',
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RegistrationAdd />
          </Suspense>
        ),
        permission: 'HISTORY/ADD',
      },
      {
        path: 'linear/:id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RegistrationAdd />
          </Suspense>
        ),
        permission: 'HISTORY/ADD',
      },
      {
        path: 'add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RegistrationAdd />
          </Suspense>
        ),
        permission: 'HISTORY/ADD',
      },
      {
        path: ':id/clarification',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Clarification />
          </Suspense>
        ),
        permission: 'REGISTRATION/ACCEPTANCE/EDIT',
      },
    ],
  },
  {
    title: 'Obyektlar',
    path: 'inspectors',
    icon: (color) => <HomeWorkIcon htmlColor={color} fontSize="small" />,
    permission: 'OBJECTS',
    // mobile: true,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <InspectorList />
          </Suspense>
        ),
        permission: 'OBJECTS/LIST',
      },

      {
        path: ':id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <InspectorEdit />
          </Suspense>
        ),
        permission: 'OBJECTS/EDIT',
      },
      {
        path: ':id/monitoring',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MonitoringList />
          </Suspense>
        ),
        permission: 'OBJECTS/MONITORING',
      },
      {
        path: ':id/monitoring/add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MonitoringAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/MONITORING/ADD',
      },
      {
        path: ':id/monitoring/edit',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MonitoringEdit />
          </Suspense>
        ),
        permission: 'OBJECTS/MONITORING/EDIT',
      },
      {
        path: ':id/documents',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <DocumentList />
          </Suspense>
        ),
        permission: 'OBJECTS/DOCUMENTS',
      },
      {
        path: ':id/documents/add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <DocumentAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/DOCUMENTS/ADD',
      },
      {
        path: ':id/documents/act-lab/add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <DocumentActAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/DOCUMENTS/ADD',
      },
      {
        path: ':id/documents/act-lab/:act_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <DocumentActAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/DOCUMENTS/ADD',
      },
      {
        path: ':id/documents/protocol/add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <DocumentProtocolAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/DOCUMENTS/ADD',
      },
      {
        path: ':id/documents/protocol/:protocol_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <DocumentProtocolAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/DOCUMENTS/ADD',
      },
      {
        path: ':id/documents/:document_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <DocumentEdit />
          </Suspense>
        ),
        permission: 'OBJECTS/DOCUMENTS/EDIT',
      },
      {
        path: ':id/journal',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <JournalList />
          </Suspense>
        ),
        permission: 'OBJECTS/JOURNAL/LIST',
      },
      {
        path: ':id/author-journal/:journal_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <AuthJournalList />
          </Suspense>
        ),
        permission: 'OBJECTS/AUTHOR-JOURNAL/LIST',
      },
      {
        path: ':id/journal/add',
        permission: 'OBJECTS/JOURNAL/ADD',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <JournalAdd />
          </Suspense>
        ),
      },
      {
        path: ':id/general-journal/:journal_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <JournalLenta />
          </Suspense>
        ),
        permission: 'OBJECTS/JOURNAL/LENTA',
      },
      {
        path: ':id/journal/:journal_name/:journal_id/:journal_relation_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <JournalView />
          </Suspense>
        ),
        permission: 'OBJECTS/JOURNAL/LENTA',
      },
      {
        path: ':id/instructions/add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <InstructionsAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/ADD',
      },
      {
        path: ':id/instructions',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <InstructionsList />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/LIST',
      },
      {
        path: ':id/instructions/view/:instruction_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <InstructionsView />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/VIEW',
      },
      {
        path: ':id/instructions/view/technician/:instruction_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <InstructionsView />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/VIOLATIONS/MONITORING/EDIT',
      },
      {
        path: ':id/instructions/:regulation_id/violation/add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ViolationAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/VIOLATIONS/ADD',
      },
      {
        path: ':id/instructions/:instruction_id/violation/:violation_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ViolationEdit />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/VIOLATIONS/EDIT',
      },
      {
        path: ':id/instructions/:instruction_id/violation/monitoring/:violation_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ViolationEdit />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/VIOLATIONS/MONITORING/EDIT',
      },
      {
        path: ':id/participants/add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ParticipantAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/PARTICIPANT/ADD',
      },
      {
        path: ':id/photo-reports',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <PhotoReports />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/PHOTO_REPORT',
      },
      {
        path: ':id/payment',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ApplicationPayment />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/PAYMENT',
      },
      {
        path: ':id/payment/add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <PaymentAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/PAYMENT',
      },
      {
        path: ':id/payment/:payment_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <PaymentAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/PAYMENT',
      },
      {
        path: ':id/calendar/:taskId',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <UsersDashboard />
          </Suspense>
        ),
        permission: 'USER/FOREMAN/DASHBOARD',
      },
    ],
  },
  {
    title: 'Qidiruv',
    path: 'search',
    element: (
      <Suspense fallback={<CircularProgress />}>
        <SearchEngine />
      </Suspense>
    ),
    permission: 'SEARCH-ENGINE',
    icon: (color) => <SearchIcon htmlColor={color} fontSize="small" />,
  },
  {
    title: 'Arizalar',
    path: 'application',
    icon: (color) => <ApplicationIcon color={color} />,
    permission: 'APPLICATION',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ApplictionList />
          </Suspense>
        ),
        permission: 'APPLICATION/LIST',
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ApplicationAllInformation />
          </Suspense>
        ),
        permission: 'APPLICATION/EDIT',
      },
      {
        path: ':id/departments',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ApplicationDepartments />
          </Suspense>
        ),
        permission: 'APPLICATION/DEPARTMENTS',
      },
      {
        path: ':id/payment',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ApplicationPayment />
          </Suspense>
        ),
        permission: 'APPLICATION/PAYMENT',
      },
      {
        path: ':id/completed-works',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ApplicationCompletdedWorks />
          </Suspense>
        ),
        permission: 'APPLICATION/COMPLETEDWORKS',
      },
    ],
  },

  {
    title: 'Sozlamalar',
    path: 'laboratory-settings',
    id: 'laboratory-settings',
    hasChildRoute: true,
    // hide: true,
    bottomElement: true,
    icon: (clName) => <SettingsIcon className={clName} />,
    permission: 'LABARATORY/SETTINGS',
    children: [
      {
        path: 'test-types',
        title: 'Sinov turlari',
        permission: 'LABARATORY/SETTINGS/TEST/TYPE',
        dropdownLike: true,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <LaboratoryTestTypesList />
              </Suspense>
            ),
            permission: 'LABARATORY/SETTINGS/TEST/TYPE',
            hide: true,
          },
          {
            path: 'add',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <LaboratoryTestTypeAdd />
              </Suspense>
            ),
            permission: 'LABARATORY/SETTINGS/TEST/TYPE',
            hide: true,
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <LaboratoryTestTypeAdd />
              </Suspense>
            ),
            permission: 'LABARATORY/SETTINGS/TEST/TYPE',
            hide: true,
          },
        ],
      },
      {
        path: 'measurement-units',
        title: "O'lchov birligi",
        permission: 'LABARATORY/SETTINGS/MEASUREMENT',
        dropdownLike: true,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <MesurementUnitsList />
              </Suspense>
            ),
            permission: 'LABARATORY/SETTINGS/MEASUREMENT',
            hide: true,
          },
          {
            path: 'add',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <MesurementUnitsAdd />
              </Suspense>
            ),
            permission: 'LABARATORY/SETTINGS/MEASUREMENT',
            hide: true,
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <MesurementUnitsAdd />
              </Suspense>
            ),
            permission: 'LABARATORY/SETTINGS/MEASUREMENT',
            hide: true,
          },
        ],
      },
    ],
  },
  {
    title: "Yozma ko'rsatmalar",
    path: 'instructions',
    icon: (color) => <DoneAllIcon color={color} />,
    permission: 'INSTRUCTIONS',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <InstructionsList />
          </Suspense>
        ),
        permission: 'INSTRUCTIONS/LIST',
      },
      {
        path: ':instruction_id/comment/:act_type',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <InstructionsComment />
          </Suspense>
        ),
        permission: 'INSTRUCTIONS/COMMENT',
      },
      {
        path: 'organization-actions/:id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <OperatorSteppers />
          </Suspense>
        ),
        permission: 'INSTRUCTION/ACTIONS/STEPPERS',
      },
      {
        path: 'organization-actions/:id/inspector',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <OperatorSteppers />
          </Suspense>
        ),
        permission: 'INSTRUCTION/ACTIONS/STEPPERS',
      },
    ],
  },
  {
    title: "Tasdiqlash bo'yicha",
    path: 'confirmations',
    icon: (color) => <DoneAllIcon color={color} />,
    permission: 'CONFIRMATIONS',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ByConfirmation />
          </Suspense>
        ),
        permission: 'CONFIRMATIONS/REGULATION/LIST',
      },
      {
        path: 'applications/:id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <OperatorSteppers />,
          </Suspense>
        ),
        permission: 'OPERATOR/APPLICATION/STEPPERS',
      },
      {
        path: ':instruction_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <InstructionsView />
          </Suspense>
        ),
        permission: 'CONFIRMATIONS/REGULATION/VIEW',
      },
    ],
  },
  {
    title: "Yozma ko'rsatmalar",
    path: 'm/instructions',
    icon: (color) => <DoneAllIcon color={color} />,
    mobile: true,
    permission: 'INSTRUCTIONS',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileRegulations />
          </Suspense>
        ),
        permission: 'INSTRUCTIONS/LIST',
      },
      {
        path: ':instruction_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileRegulationView />
          </Suspense>
        ),
        permission: 'INSTRUCTIONS/ADD',
      },
      {
        path: ':instruction_id/violation/:violation_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileViolationAdd />
          </Suspense>
        ),
        permission: 'INSTRUCTIONS/ADD',
      },
      {
        path: ':instruction_id/comment/:act_type',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <MobileregulationComment />
          </Suspense>
        ),
        permission: 'INSTRUCTIONS/COMMENT',
      },
      {
        path: 'add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <InspectorAdd />
          </Suspense>
        ),
        permission: 'INSTRUCTIONS/ADD',
      },
    ],
  },
  {
    path: 'employee-add',
    title: "Xodim qo'shish",
    id: 'employee-add',
    permission: 'EMPLOYEE/ADD',
    element: (
      <Suspense fallback={<CircularProgress />}>
        <EmployeeAdding />
      </Suspense>
    ),
    hide: true,
  },
  {
    path: 'employees',
    title: 'Xodimlar',
    id: 'employees',
    icon: (color) => <GroupIcon color={color} />,
    hasChildRoute: true,
    permission: 'EMPLOYEES',
    children: [
      {
        title: 'Mutaxassislar',
        path: 'list',
        permission: 'EMPLOYEES/LIST',
        dropdownLike: true,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeList />
              </Suspense>
            ),
            permission: 'EMPLOYEES/LIST',
            hide: true,
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeEdit />
              </Suspense>
            ),
            hide: true,
            permission: 'EMPLOYEES/EDIT',
          },
          {
            path: 'add',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeAdding />
              </Suspense>
            ),
            hide: true,
            permission: 'EMPLOYEES/ADD',
          },
        ],
      },
      {
        title: 'Priyomka tashkilotlari',
        path: 'acceptance',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Acceptance />
          </Suspense>
        ),
        permission: 'ACCEPTANCE/LIST',
      },
      {
        path: 'inspector',
        title: 'Inspektor',
        permission: 'EMPLOYEES/INSPECTOR',
        dropdownLike: true,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeList />
              </Suspense>
            ),
            permission: 'EMPLOYEES/INSPECTOR',
            hide: true,
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeEdit />
              </Suspense>
            ),
            permission: 'EMPLOYEES/INSPECTOR',
            hide: true,
          },
        ],
      },
      {
        title: 'Buxgalteriya',
        path: 'accounting',
        permission: 'EMPLOYEES/ACCOUNTING',
        dropdownLike: true,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeList />
              </Suspense>
            ),
            permission: 'EMPLOYEES/ACCOUNTING',
            hide: true,
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeEdit />
              </Suspense>
            ),
            permission: 'EMPLOYEES/ACCOUNTING',
            hide: true,
          },
        ],
      },
      {
        title: "Inspeksiya va bo'lim boshliqlari",
        path: 'manager',
        permission: 'EMPLOYEES/MANAGER',
        dropdownLike: true,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeList />
              </Suspense>
            ),
            permission: 'EMPLOYEES/MANAGER',
            hide: true,
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeEdit />
              </Suspense>
            ),
            permission: 'EMPLOYEES/MANAGER',
            hide: true,
          },
        ],
      },
      {
        title: 'Arxiv',
        path: 'archive',
        permission: 'EMPLOYEES/ARCHIVE',
        dropdownLike: true,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeList />
              </Suspense>
            ),
            permission: 'EMPLOYEES/ARCHIVE',
            hide: true,
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeEdit />
              </Suspense>
            ),
            permission: 'EMPLOYEES/ARCHIVE',
            hide: true,
          },
        ],
      },
      {
        title: 'Rotatsiya',
        path: 'rotation',
        permission: 'EMPLOYEES/ROTATION',
        dropdownLike: true,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeList />
              </Suspense>
            ),
            permission: 'EMPLOYEES/ROTATION',
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <RotationEdit />
              </Suspense>
            ),
            permission: 'EMPLOYEES/ROTATION',
          },
        ],
      },
      {
        title: 'Yurist',
        path: 'lawyer',
        permission: 'EMPLOYEES/LAWYER',
        dropdownLike: true,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeList />
              </Suspense>
            ),
            permission: 'EMPLOYEES/LAWYER',
            hide: true,
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeEdit />
              </Suspense>
            ),
            permission: 'EMPLOYEES/LAWYER',
            hide: true,
          },
        ],
      },
      {
        title: 'Qurilish qatnashuvchilari',
        path: 'participants',
        permission: 'EMPLOYEES/PARTICIPANTS',
        dropdownLike: true,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeList />
              </Suspense>
            ),
            permission: 'EMPLOYEES/PARTICIPANTS',
            hide: true,
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <EmployeeEdit />
              </Suspense>
            ),
            permission: 'EMPLOYEES/PARTICIPANTS',
            hide: true,
          },
        ],
      },
    ],
  },
  {
    title: 'Statistika',
    path: '/statistics',
    element: (
      <Suspense fallback={<CircularProgress />}>
        <Statistics />
      </Suspense>
    ),
    icon: (color) => <AnalyticsIcon htmlColor={color} />,
    permission: 'STATISTICS',
  },
  {
    title: 'Ijro 4',
    path: 'journals',
    icon: (color) => <MenuBookIcon htmlColor={color} />,
    permission: 'JOURNALS',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <JournalList />
          </Suspense>
        ),
        permission: 'JOURNALS',
      },
      {
        path: 'add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <JournalAdd />
          </Suspense>
        ),
        permission: 'JOURNALS',
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <JournalView />
          </Suspense>
        ),
        permission: 'JOURNALS',
      },
    ],
  },
  {
    title: 'Labaratoriya',
    path: 'labaratory',
    icon: (color) => <LabaratoryIcon color={color} />,
    permission: 'LABARATORY',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Labaratory />
          </Suspense>
        ),
        permission: 'LabaratoryObjects/EDIT',
        hide: true,
      },
      {
        path: 'add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <LabaratoryApplicationAdd />
          </Suspense>
        ),
        permission: 'APPLICATION/ADD',
      },
      {
        path: 'confirm/:id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ApplicationInformation />
          </Suspense>
        ),
        permission: 'LABARATORY/CONTRACT/EDIT',
        hide: true,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <ApplicationAllInformation />
              </Suspense>
            ),
            permission: 'APPLICATION/DEPARTMENTS',
          },
        ],
      },
      {
        path: ':id/edit',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <LabaratoryApplicationAdd />
          </Suspense>
        ),
        permission: 'LABARATORY/CONTRACT/EDIT',
      },
      {
        path: ':id/payment/add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <PaymentAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/PAYMENT',
      },
      {
        path: ':id/payment/:payment_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <PaymentAdd />
          </Suspense>
        ),
        permission: 'OBJECTS/INSTRUCTIONS/PAYMENT',
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ApplicationInformation />
          </Suspense>
        ),
        permission: 'LABARATORY/CONTRACT/EDIT',
        hide: true,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <ApplicationAllInformation />
              </Suspense>
            ),
            permission: 'LABARATORY/CONTRACT/EDIT',
          },
          {
            path: 'departments',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <ApplicationDepartments />
              </Suspense>
            ),
            permission: 'LABARATORY/CONTRACT/EDIT',
          },
          {
            path: 'payment',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <ApplicationPayment />
              </Suspense>
            ),
            permission: 'LABARATORY/CONTRACT/EDIT',
          },
          {
            path: 'completed-works',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <ApplicationCompletdedWorks />
              </Suspense>
            ),
            permission: 'LABARATORY/CONTRACT/EDIT',
          },
        ],
      },
    ],
  },
  {
    title: 'Labaratoriya',
    path: 'labaratory',
    icon: (color) => <LabaratoryIcon color={color} />,
    permission: 'LABARATORY/APPARAT',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Labaratory />
          </Suspense>
        ),
        permission: 'LABARATORY/APPARAT',
        hide: true,
      },
    ],
  },
  {
    title: 'Arxiv',
    path: 'archive',
    permission: 'ARCHIVE',
    icon: (color) => <Archive htmlColor={color} />,
    dropdownLike: true,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ArchiveListPage />
          </Suspense>
        ),
        permission: 'ARCHIVE/LIST',
        hide: true,
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ApplicationInformation />
          </Suspense>
        ),
        permission: 'ARCHIVE/EDIT',
        hide: true,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <ApplicationAllInformation />
              </Suspense>
            ),
            permission: 'LABARATORY/CONTRACT/EDIT',
          },
          {
            path: 'departments',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <ApplicationDepartments />
              </Suspense>
            ),
            permission: 'LABARATORY/CONTRACT/EDIT',
          },
          {
            path: 'payment',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <ApplicationPayment />
              </Suspense>
            ),
            permission: 'LABARATORY/CONTRACT/EDIT',
          },

          {
            path: 'completed-works',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <ApplicationCompletdedWorks />
              </Suspense>
            ),
            permission: 'LABARATORY/CONTRACT/EDIT',
          },
        ],
      },
    ],
  },
  {
    title: 'Buhgalteriya',
    path: 'dashboard-buxgalter',
    icon: (color) => <DollarIcon color={color} />,
    permission: 'BUHGALTER/DASHBOARD',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <DashboardBuxgalter apparat={true} />
          </Suspense>
        ),
        permission: 'BUHGALTER/DASHBOARD',
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <DashboardBuxgalterMain />
              </Suspense>
            ),
            permission: 'BUHGALTER/DASHBOARD',
          },
        ],
      },
    ],
  },
  {
    title: 'Yuridik byuro',
    path: 'yuridik-byuro',
    icon: (color) => <ShieldWithAvatarIcon color={color} />,
    permission: 'YURIDIK/BYURO',
    children: [
      {
        path: '',
        permission: 'YURIDIK/BYURO',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <AdministrativeAdmin apparat={true} />
          </Suspense>
        ),
      },
      {
        path: 'registration/history/:id',
        permission: 'ADMINISTRATIVE/HISTORY/APPARAT',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RegistrationAdd />
          </Suspense>
        ),
      },
      {
        path: 'instructions/:instruction_id',
        permission: 'ADMINISTRATIVE/INSTRUCTIONS/APPARAT',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <InstructionsView />
          </Suspense>
        ),
      },
    ],
  },
  {
    title: 'Kutubxona',
    path: 'library',
    icon: (color) => <BookIcon htmlColor={color} />,
    permission: 'LIBRARY',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <TypeList />
          </Suspense>
        ),
        permission: 'LIBRARY/LIST',
      },
      {
        path: ':typeId',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Library />
          </Suspense>
        ),
        permission: 'LIBRARY/LIST',
      },
      {
        path: ':typeId/:id/add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <LibraryAdd />
          </Suspense>
        ),
        permission: 'LIBRARY/ADD',
      },
      {
        path: ':typeId/:id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <LibraryAdd />
          </Suspense>
        ),
        permission: 'LIBRARY/EDIT',
      },
    ],
  },
  {
    title: 'Kutubxona',
    path: 'm/library',
    mobile: true,
    icon: (color) => <BookIcon htmlColor={color} />,
    permission: 'LIBRARY',
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Library />
          </Suspense>
        ),
        permission: 'LIBRARY/LIST',
      },
      {
        path: 'add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <LibraryAdd />
          </Suspense>
        ),
        permission: 'LIBRARY/ADD',
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <LibraryAdd />
          </Suspense>
        ),
        permission: 'LIBRARY/EDIT',
      },
    ],
  },
  {
    title: 'Chaqiruvlar',
    path: 'called',
    permission: 'LABARATORY/CALLED/LIST',
    icon: () => <Flag htmlColor="primary" />,
    children: [
      {
        path: '',
        element: <LabaratoryCalled />,
        permission: 'LABARATORY/CALLED/LIST',
      },
      {
        path: 'history',
        element: <LabaratoryCalled />,
        permission: 'LABARATORY/CALLED/LIST',
      },
    ],
  },
  {
    title: 'Sozlamalar',
    id: 'analytic-settings',
    path: 'analytic-settings',
    icon: (clName) => <SettingsIcon className={clName} />,
    bottomElement: true,
    hasChildRoute: true,
    // hide: true,
    permission: 'ANALYTIC-SETTINGS',
    children: [
      {
        title: 'Asoslar',
        path: '',
        // element: (
        //   <Suspense fallback={<CircularProgress />}>
        //     <></>
        //   </Suspense>
        // ),
        permission: 'ANALYTIC-SETTINGS/BASIS',
        children: [
          {
            path: 'basis',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <Basics />
              </Suspense>
            ),
            hide: true,
            permission: 'ANALYST',
          },
          {
            path: 'basis/add',
            hide: true,
            element: (
              <Suspense fallback={<CircularProgress />}>
                <BasicsAdd />
              </Suspense>
            ),
            permission: 'ANALYST/ADD',
          },
          {
            path: 'basis/:id',
            hide: true,
            element: (
              <Suspense fallback={<CircularProgress />}>
                <BasicsAdd />
              </Suspense>
            ),
            permission: 'ANALYST/ADD',
          },
        ],
      },
    ],
  },
  {
    title: 'Sozlamalar',
    id: 'settings',
    path: 'settings',
    icon: (clName) => <SettingsIcon className={clName} />,
    bottomElement: true,
    hasChildRoute: true,
    // hide: true,
    permission: 'SETTINGS',
    children: [
      {
        path: '',
        title: 'Monitoring',
        permission: 'SETTINGS/MONITORING',
        children: [
          {
            title: 'Chek-list',
            path: 'check-list',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <Settings />,
              </Suspense>
            ),
            permission: 'SETTINGS/CHECKLIST',
          },
          {
            title: 'Chek-list',
            path: 'check-list/:id',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <CheckListAdd />
              </Suspense>
            ),
            permission: 'SETTINGS/CHECKLIST',
            hide: true,
          },
          {
            title: 'Qabul qilish',
            path: 'check-list/accept/:id',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <CheckListAdd />
              </Suspense>
            ),
            permission: 'SETTINGS/CHECKLIST',
            hide: true,
          },
          {
            title: 'Chek-list',
            path: 'check-list/:activeTabId/add',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <CheckListAdd />
              </Suspense>
            ),
            permission: 'SETTINGS/CHECKLIST',
            hide: true,
          },
          {
            title: 'Vaqt',
            path: 'time',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <SettingsTime />
              </Suspense>
            ),
            permission: 'SETTINGS/TIME',
          },
          {
            title: 'Boshqalar',
            path: 'others',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <SettingsOthers />
              </Suspense>
            ),
            permission: 'SETTINGS/OTHERS',
          },
        ],
      },

      {
        title: 'Rekvizitlar',
        path: 'requisites',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RequisitesList />
          </Suspense>
        ),
        permission: 'SETTINGS/REQUISITES',
      },
      {
        title: 'Rekvizitlar',
        path: 'requisites/:id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RequisitesEdit />
          </Suspense>
        ),
        permission: 'SETTINGS/REQUISITES',
        hide: true,
      },
      {
        title: 'Rekvizitlar',
        path: 'laboratory-requisites/:id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RequisitesEdit />
          </Suspense>
        ),
        permission: 'SETTINGS/REQUISITES',
        hide: true,
      },
      {
        title: 'Labaratoriya rekvizitlari',
        path: 'laboratory-requisites',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RequisitesList />
          </Suspense>
        ),
        permission: 'SETTINGS/LABORATORY-REQUISITES',
      },
      {
        title: 'Rollar',
        path: 'roles',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RolesList />
          </Suspense>
        ),
        permission: 'SETTINGS/ROLES',
      },
      {
        title: 'Rekvizitlar',
        path: 'roles/:id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RolesEdit />
          </Suspense>
        ),
        permission: 'SETTINGS/REQUISITES',
        hide: true,
      },
      {
        title: 'Soxalar',
        path: 'fields',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Fields />
          </Suspense>
        ),
        permission: 'SETTINGS/FIELDS',
      },
      {
        title: 'Soxalar',
        path: 'fields/:id/:status',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <FieldsEdit />
          </Suspense>
        ),
        permission: 'SETTINGS/FIELDS',
        hide: true,
      },
      {
        title: 'Soxalar',
        path: 'fields/list/:id/:type',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <FieldsList />
          </Suspense>
        ),
        permission: 'SETTINGS/FIELDS',
        hide: true,
      },
      {
        path: 'measurement-units',
        title: "O'lchov birligi",
        permission: 'LABARATORY/SETTINGS/MEASUREMENT',
        dropdownLike: true,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <MesurementUnitsList />
              </Suspense>
            ),
            permission: 'LABARATORY/SETTINGS/MEASUREMENT',
            hide: true,
          },
          {
            path: 'add',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <MesurementUnitsAdd />
              </Suspense>
            ),
            permission: 'LABARATORY/SETTINGS/MEASUREMENT',
            hide: true,
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<CircularProgress />}>
                <MesurementUnitsAdd />
              </Suspense>
            ),
            permission: 'LABARATORY/SETTINGS/MEASUREMENT',
            hide: true,
          },
        ],
      },
    ],
  },
  {
    path: 'faq',
    // hide: true,  /
    icon: (clName) => <HelpIcon className={clName} />,
    title: "Ko'p beriladigan savollar",
    permission: 'FAQ',
    bottomElement: true,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Faq />
          </Suspense>
        ),
        permission: 'FAQ/LIST',
      },
      {
        path: 'add',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <FaqAdd />
          </Suspense>
        ),
        permission: 'FAQ/ADD',
      },
      {
        path: ':id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <FaqAdd />
          </Suspense>
        ),
        permission: 'FAQ/EDIT',
      },
    ],
  },
  {
    title: 'Xabarnomalar',
    path: 'notifications',
    icon: (color) => <AccessTimeIcon htmlColor={color} fontSize="small" />,
    permission: 'ADMINISTRATIVE/ADMINISTRATOR',
    children: [
      {
        path: '',
        permission: 'ADMINISTRATIVE/MAIN',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <AdministrativeAdmin />
          </Suspense>
        ),
      },
      {
        path: 'registration/:id',
        permission: 'ADMINISTRATIVE/REGISTRATION',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RegistrationAdd />
          </Suspense>
        ),
      },
      {
        path: 'instructions/:instruction_id',
        permission: 'ADMINISTRATIVE/INSTRUCTIONS',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <InstructionsView />
          </Suspense>
        ),
      },
      {
        path: ':id/instructions/:instruction_id/violation/:violation_id',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ViolationEdit />
          </Suspense>
        ),
        permission: 'ADMINISTRATIVE/INSTRUCTIONS/VIOLATIONS/MONITORING/EDIT',
      },
    ],
  },
  {
    title: 'Tarix',
    path: 'history',
    icon: (color) => <HistoryOutlinedIcon htmlColor={color} />,
    permission: 'ADMINISTRATIVE/HISTORY',
    children: [
      {
        path: '',
        permission: 'ADMINISTRATIVE/HISTORY',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <AdministrativeAdmin />
          </Suspense>
        ),
      },
      {
        path: 'registration/:id',
        permission: 'ADMINISTRATIVE/HISTORY',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <RegistrationAdd />
          </Suspense>
        ),
      },
      {
        path: 'instructions/:instruction_id',
        permission: 'ADMINISTRATIVE/INSTRUCTIONS',
        element: (
          <Suspense fallback={<CircularProgress />}>
            <InstructionsView />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: 'profile',
    element: (
      <Suspense fallback={<CircularProgress />}>
        <Profile />
      </Suspense>
    ),
    title: 'Shaxsiy kabinet',
    icon: (color) => <PersonIcon color={color} />,

    // hide: true,
    permission: 'PROFILE',
    bottomElement: true,
  },
]

const AnimatedRoutes = ({ children, exitBeforeEnter = true, initial = false }) => {
  return (
    <AnimatePresence exitBeforeEnter={exitBeforeEnter} initial={initial}>
      {children}
    </AnimatePresence>
  )
}

const RouteTransition = ({ children, slide = 0, slideUp = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0.5, x: slide, y: slideUp }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0.2, x: slide, y: slideUp }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}

export default function Routes() {
  const { roleId } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const location = useLocation()
  const filterRoutes = useCallback(
    (route, parentRoute) => {
      if (mobile()) {
        return permissions[roleId]?.includes(route.permission) && parentRoute.mobile
      } else {
        return permissions[roleId]?.includes(route.permission)
      }
    },
    [roleId]
  )
  const hasRoute = routes.filter((route) => filterRoutes(route, route)).length
  useEffect(() => {
    if (hasRoute) {
      if (location?.pathname === '/') {
        if (roleId) navigate(routes.filter((route) => filterRoutes(route, route))[0]?.path)
        else navigate('/login')
      }
    } else {
      if (roleId) {
        navigate('/fallback')
      } else if (location.pathname !== '/login') {
        navigate('/login')
      }
    }
  }, [location?.pathname, roleId, filterRoutes, navigate, hasRoute])
  const element = useRoutes(
    hasRoute
      ? routes
          .filter((route) => filterRoutes(route, route))
          .map((item) => {
            if (item.element) {
              return {
                ...item,
                element: (
                  <Suspense fallback={<CircularProgress />}>
                    <RouteTransition>{item.element}</RouteTransition>
                  </Suspense>
                ),
              }
            }
            if (item.children) {
              return {
                ...item,
                children: item.children
                  .filter((childRoute) => filterRoutes(childRoute, item))
                  .map((val) => {
                    if (val.element) {
                      return {
                        ...val,
                        element: (
                          <Suspense fallback={<CircularProgress />}>
                            <RouteTransition>{val.element}</RouteTransition>
                          </Suspense>
                        ),
                      }
                    }
                    if (val.children) {
                      return {
                        ...val,
                        children: val.children
                          .filter((i) => filterRoutes(i, item))
                          .map((i) => {
                            return {
                              ...i,
                              element: (
                                <Suspense fallback={<CircularProgress />}>
                                  <RouteTransition>{i.element}</RouteTransition>
                                </Suspense>
                              ),
                            }
                          }),
                      }
                    }
                    return {
                      ...val,
                    }
                  }),
              }
            }

            return {
              ...item,
            }
          })
      : roleId
      ? [
          {
            path: 'fallback',
            hide: true,
            element: (
              <Suspense fallback={<CircularProgress />}>
                <FallbackPage />
              </Suspense>
            ),
          },
        ]
      : [
          {
            path: 'login',
            hide: true,
            element: (
              <Suspense fallback={<CircularProgress />}>
                <Login />
              </Suspense>
            ),
          },
        ]
  )

  return (
    <AnimatedRoutes exitBeforeEnter initial={false}>
      {element}
    </AnimatedRoutes>
  )
}
