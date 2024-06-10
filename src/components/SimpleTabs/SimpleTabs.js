import * as React from 'react'
import { styled } from '@mui/material/styles'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useLocation, useNavigate } from 'react-router-dom'

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{
      children: <span className="MuiTabs-indicatorSpan" />,
    }}
    variant="scrollable"
    scrollButtons={false}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    height: '4px',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 'auto',
    width: '100%',
    backgroundColor: '#0E73F6',
    overflowX: 'auto',
  },
})

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  fontSize: theme.typography.pxToRem(14),
  marginRight: '20px',
  fontWeight: 500,
  height: 56,
  padding: '16px 4px',
  color: '#0E73F6!important',
  minWidth: 'auto',
  outline: 'none !important',
  overflow: 'visible',
  '&.Mui-selected': {
    color: '#0E73F6',
    outline: 'none',
  },
  '&.Mui-selected:focus': {
    outline: 'none',
  },
  '&.Mui-selected:active': {
    outline: 'none',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}))

export function SimpleMuiTabs({
  elements,
  getParamsFromLocation = true,
  setActiveTab,
  activeTab,
  noPadding = false,
  limit = 10,
  offset = 1,
  setOffset = 1,
  hasBorder = true,
}) {
  // const [value, setValue] = React.useState(activeTab)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  React.useEffect(() => {
    if (getParamsFromLocation) {
      navigate(`${pathname}?offset=${offset}&limit=${limit}&tab=${activeTab}`)
    }
  }, [setActiveTab, getParamsFromLocation, activeTab])

  const handleChange = (event, newValue) => {
    getParamsFromLocation && navigate(`${pathname}?offset=${1}&limit=${10}&tab=${newValue}`)
    setActiveTab(newValue)
  }

  return (
    <div>
      <Box
        sx={{
          width: '100%',
          padding: '0 16px',
          borderBottom: hasBorder ? '1px solid #EBEDEE' : '',
        }}
      >
        <StyledTabs value={parseInt(activeTab)} onChange={handleChange} aria-label="styled tabs example">
          {elements?.map((item) => (
            <StyledTab
              key={item?.key}
              label={
                <div className="flex items-center">
                  <div className={activeTab == item?.key ? 'text-blue-600' : 'text-[#6E8BB7BF]'}>{item?.title}</div>
                  {item?.count && (
                    <div
                      className={`ml-2.5 px-2 h-6 leading-6 text-sm rounded-full text-white ${
                        activeTab == item?.key ? 'bg-blue-600' : 'bg-[#6E8BB7BF]'
                      }`}
                    >
                      {item?.count}
                    </div>
                  )}
                </div>
              }
            />
          ))}
        </StyledTabs>
      </Box>
      {elements?.map(
        (val, index) =>
          index == activeTab &&
          val.component && (
            <div className={`${noPadding ? '' : 'p-4'}`} key={index + 'tabpanel'}>
              {val.component}
            </div>
          )
      )}
    </div>
  )
}
