import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import SettingsIcon from '@mui/icons-material/Settings'
import { Tooltip } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'
import PersonIcon from '@mui/icons-material/Person'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'

import { permissions } from '../../settings/permissions'
import logo from '../../assets/images/logo.png'
import { routes } from '../../routes'
import { useRegulation } from '../../services'
import MenuAccordion from '../MenuAccordion'
import { v4 } from 'uuid'
import {
  ACT_TYPE_ID_ACT_APPROVED,
  ACT_TYPE_ID_EXTENDATION_REVIEWED,
  INSPEKSIYA_BOSHLIGI_ROLE_ID,
  INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID,
  INSPEKSIYA_BOSS_ZAM_ROLE_ID,
  REGULATION_STATUS_ID_IN_APPROVAL,
  REPUBLIC_APPARAT_ROLE_ID,
  SMR_BOSHLIGI_ROLE_ID,
} from '../../settings/constants'
import { useClaim } from '../../services/claim'

export function Sidebar({ open, setOpen }) {
  const { roleId, userId, regionId } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [innerRouteKey, setInnerRouteKey] = useState('')

  const shouldRequest = permissions[roleId]?.includes('OBJECTS/IN_APPROVAL/REQUEST')
  const showCount = permissions[roleId]?.includes('SHOW/COUNT')

  const isInspeksiya =
    roleId === INSPEKSIYA_BOSHLIGI_ROLE_ID ||
    roleId === INSPEKSIYA_BOSS_FIRST_ZAM_ROLE_ID ||
    roleId === INSPEKSIYA_BOSS_ZAM_ROLE_ID
  const smrOrInpeksiya = roleId === SMR_BOSHLIGI_ROLE_ID || isInspeksiya

  const { regulationTypes } = useRegulation({
    regulationTypesQueryProps: {
      enabled: roleId !== REPUBLIC_APPARAT_ROLE_ID,
    },
  })

  const regulationByUserParam = {
    1: {
      regulation_type_id: regulationTypes?.data?.regulation_types[1]?.id,
      inspector_id: userId,
      offset: 1,
      limit: 10,
    },
    0: {
      regulation_type_id: regulationTypes?.data?.regulation_types[0]?.id,
      user_id: userId,
      offset: 1,
      limit: 10,
    },
  }

  const { regulationByUser } = useRegulation({
    regulationByUserParams: regulationByUserParam[0],
    regulationByUserProps: {
      enabled: !!shouldRequest,
    },
  })

  const { regulationByUser: regulationByUser2 } = useRegulation({
    regulationByUserParams: regulationByUserParam[1],
    regulationByUserProps: {
      enabled: !!shouldRequest,
    },
  })

  const { regulations } = useRegulation({
    regulationParams: {
      act_status_id: isInspeksiya ? ACT_TYPE_ID_ACT_APPROVED : ACT_TYPE_ID_EXTENDATION_REVIEWED,
      status_id: REGULATION_STATUS_ID_IN_APPROVAL,
      region_id: regionId,
    },
    regulationsQueryProps: { enabled: !!smrOrInpeksiya },
  })

  const innerItems = useMemo(() => {
    return [
      // {
      //   path: 'settings/check-list',
      //   title: 'Sozlamalar',
      //   id: 'settings',
      //   icon: (clName) => <SettingsIcon className={clName} />,
      //   hide: !permissions[roleId]?.includes('SETTINGS'),
      // },
      ...routes.filter((route) => route.bottomElement),
    ]
  }, [])
  // [
  //
  //   {
  //     route: 'laboratory-settings',
  //     title: 'Sozlamalar',
  //     hasChildRoute: true,
  //     id: 'laboratory-settings',
  //     icon: (clName) => <SettingsIcon className={clName} />,
  //     hide: !permissions[roleId]?.includes('LABARATORY'),
  //   },
  //   {
  //     route: 'faq',
  //     title: "Ko'p beriladigan savollar",
  //     icon: (clName) => <HelpIcon className={clName} />,
  //     hide: false,
  //   },
  //   {
  //     route: 'profile',
  //     title: 'Shaxsiy kabinet',
  //     icon: (clName) => <PersonIcon className={clName} />,
  //     hide: false,.map
  //   },
  // ]
  // console.log(permissions[roleId])
  // console.log(routes.permission)

  const { getClaimOrganizationActionsQuery } = useClaim({
    user_id: userId,
    getClaimOrganizationActionsProps: {
      enabled: true,
    },
  })
  return (
    <div className={`h-full flex bg-white transition-all`}>
      <div className="flex flex-col items-center justify-between h-full border-r">
        <div>
          <div className="p-3 border-b">
            <img
              src={logo}
              alt="logo"
              className="w-[31px] h-[31px] object-cover cursor-pointer"
              onClick={() => routes.find((i) => pathname.includes(i.path))?.hasChildRoute && setOpen((prev) => !prev)}
            />
          </div>
          <div className="pt-1.5">
            {routes
              .filter((route) => !route.bottomElement)
              .map(
                (route) =>
                  (route.permission === 'all' ? true : permissions[roleId]?.includes(route.permission)) &&
                  !route.mobile &&
                  !route.hide && (
                    <div
                      key={route.path + 'sidebar'}
                      className={`px-2 py-1.5`}
                      onClick={() => {
                        if (route?.hasChildRoute) {
                          setOpen(true)
                          if (route?.id) {
                            setInnerRouteKey(route.id)
                          }
                        } else {
                          setOpen(false)
                        }
                      }}
                    >
                      <NavLink
                        to={
                          route?.children
                            ? !route.children[0].dropdownLike
                              ? `${route.path}${
                                  route.children?.[0].children?.[0].path
                                    ? `/${route.children?.[0].children?.[0].path}`
                                    : ''
                                }`
                              : `${route.path}${route.children?.[0].path ? `/${route.children?.[0].path}` : ''}`
                            : route.path
                        }
                        key={route.path + 'sidebar'}
                      >
                        {({ isActive }) => (
                          <Tooltip title={route.title} arrow placement="right">
                            <div
                              className={`h-9 w-9 rounded-md text-center relative flex justify-center items-center ${
                                isActive ? 'text-white bg-primary' : 'text-secondary'
                              }`}
                            >
                              {route.icon(isActive ? '#fff' : '#6E8BB7')}
                              {route.path === 'instructions'
                                ? (shouldRequest || showCount) && (
                                    <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-red-500 leading-[20px] rounded-full text-white font-medium text-xs">
                                      {regulationByUser2.data?.count &&
                                      regulationByUser.data?.count &&
                                      getClaimOrganizationActionsQuery.data?.data?.count
                                        ? regulationByUser2.data?.count +
                                          regulationByUser.data?.count +
                                          getClaimOrganizationActionsQuery.data?.data?.count
                                        : regulationByUser.data?.count ||
                                          regulationByUser2.data?.count ||
                                          getClaimOrganizationActionsQuery.data?.data?.count ||
                                          0}
                                    </span>
                                  )
                                : route.path === 'confirmations' && (
                                    <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-red-500 leading-[20px] rounded-full text-white font-medium text-xs">
                                      {regulations.data?.count + regulations.data?.count ||
                                        regulations.data?.count ||
                                        regulations.data?.count ||
                                        0}
                                    </span>
                                  )}
                            </div>
                          </Tooltip>
                        )}
                      </NavLink>
                    </div>
                  )
              )}
          </div>
        </div>
        <div className="w-full text-center">
          {innerItems.map(
            (item, index) =>
              (item.permission === 'all' ? true : permissions[roleId]?.includes(item.permission)) &&
              !item.hide && (
                <div
                  key={item.route}
                  className={`cursor-pointer ${index === innerItems.length - 1 ? 'border-t' : ''}`}
                  onClick={() => {
                    if (item?.hasChildRoute) {
                      setOpen(true)
                      if (item?.id) {
                        setInnerRouteKey(item.id)
                      }
                    } else {
                      setOpen(false)
                    }
                  }}
                >
                  <NavLink
                    to={
                      item?.children
                        ? !item.children?.[0].dropdownLike
                          ? `${item.path}${
                              item.children?.[0].children?.[0].path ? `/${item.children?.[0].children?.[0].path}` : ''
                            }`
                          : `${item.path}${item.children?.[0].path ? `/${item.children?.[0].path}` : ''}`
                        : item.path
                    }
                  >
                    {({ isActive }) => (
                      <div
                        className={`my-2.5`}
                        onClick={() => {
                          if (item?.id) {
                            setInnerRouteKey(item.id)
                            setOpen(true)
                          } else {
                            setOpen(false)
                          }
                        }}
                      >
                        <Tooltip title={item.title} arrow placement="right">
                          <div
                            className={`mx-2 w-9 h-9 flex items-center justify-center rounded-md ${
                              isActive ? 'text-white bg-primary' : 'text-secondary'
                            }`}
                          >
                            {item.icon(isActive ? '#fff' : '#6E8BB7')}
                          </div>
                        </Tooltip>
                      </div>
                    )}
                  </NavLink>
                </div>
              )
          )}
        </div>
      </div>

      <div className={`duration-300 ${open ? 'w-[276px] border-r' : 'w-0'}`}>
        {routes
          .filter((route) => route.id === innerRouteKey)
          .map(
            (route) =>
              route.hasChildRoute && (
                <div key={v4() + route.path}>
                  <div className="p-3 h-[56px] pt-4 border-b flex justify-between items-center">
                    <span className="text-base leading-6 font-semibold">{route.title?.toUpperCase()}</span>
                    <div className="flex items-center justify-between">
                      {open && (
                        <span
                          onClick={() => setOpen(false)}
                          className="bg-gray-100 rounded-[6px] w-[32px] h-[32px] flex items-center justify-center cursor-pointer"
                        >
                          <KeyboardDoubleArrowLeftIcon fontSize="small" />
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="py-1.5 px-2.5">
                    {route.children.map(
                      (childRoute) =>
                        !childRoute.hide &&
                        permissions[roleId]?.includes(childRoute.permission) &&
                        (childRoute?.children ? (
                          open &&
                          (childRoute?.dropdownLike ? (
                            <NavLink to={`${route.path}/${childRoute.path}`} key={childRoute.path + 'sidebar' + v4()}>
                              {({ isActive }) => (
                                <div
                                  className={`my-1.5 px-3 py-1.5 leading-6 rounded-md text-sm font-medium ${
                                    isActive ? 'text-white bg-primary' : 'text-secondary'
                                  }`}
                                >
                                  {childRoute.title}
                                </div>
                              )}
                            </NavLink>
                          ) : (
                            <MenuAccordion navigate={navigate} title={childRoute.title}>
                              {childRoute.children?.map(
                                (grandChild) =>
                                  !grandChild?.hide && (
                                    <NavLink
                                      to={`${route.path}/${grandChild.path}`}
                                      key={grandChild.path + 'sidebar' + v4()}
                                    >
                                      {({ isActive }) => (
                                        <div
                                          className={`mx-2 my-1.5 px-6 py-1.5 rounded-md leading-6 text-sm font-medium ${
                                            isActive ? 'text-white bg-primary' : 'text-secondary'
                                          }`}
                                        >
                                          {grandChild.title}
                                        </div>
                                      )}
                                    </NavLink>
                                  )
                              )}
                            </MenuAccordion>
                          ))
                        ) : (
                          <NavLink to={`${route.path}/${childRoute.path}`} key={childRoute.path + 'sidebar' + v4()}>
                            {({ isActive }) =>
                              open && (
                                <div
                                  className={`my-1.5 px-3 py-1.5 leading-6 rounded-md text-sm font-medium ${
                                    isActive ? 'text-white bg-primary' : 'text-secondary'
                                  }`}
                                >
                                  {childRoute.title}
                                </div>
                              )
                            }
                          </NavLink>
                        ))
                    )}
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  )
}
