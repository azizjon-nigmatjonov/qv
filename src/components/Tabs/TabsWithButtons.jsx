import * as React from 'react'
import { styled } from '@mui/system'
import TabsUnstyled from '@mui/base/TabsUnstyled'
import TabsListUnstyled from '@mui/base/TabsListUnstyled'
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled'
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled'
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled'

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
}
const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #000;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px 6px;
  border: 1px solid #ededed;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    background-color: ${grey[100]};
  }

  &:focus {
    color: #fff;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #6e8bb7;
    color: #fff;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const TabPanel = styled(TabPanelUnstyled)(
  ({ theme }) => `
  width: 100%;
  font-size: 0.875rem;
  `
)

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
  min-width: 400px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  overflow-x: auto;
  `
)

export default function TabsWithButtons({ tabs, setActiveTab }) {
  return (
    <TabsUnstyled defaultValue={0}>
      <TabsList>
        {tabs?.map((tab) => (
          <Tab
            onClick={() => {
              setActiveTab(tab?.key)
            }}
            key={tab?.key}
          >
            <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '120px' }}>
              {tab?.title}
            </span>
          </Tab>
        ))}
      </TabsList>
      {tabs?.map((tab) => (
        <TabPanel key={tab?.key} value={tab?.key}>
          {tab?.component}
        </TabPanel>
      ))}
    </TabsUnstyled>
  )
}
