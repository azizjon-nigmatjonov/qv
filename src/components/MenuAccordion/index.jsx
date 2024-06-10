import * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(() => ({
  borderRadius: '6px',
  backgroundColor: '#f3f6f9',
  marginBottom: '4px',
}))

const AccordionSummary = styled((props) => {
  return (
    <MuiAccordionSummary
      expandIcon={<KeyboardArrowDownIcon sx={{ fontSize: '22px', color: '#6E8BB7' }} />}
      {...props}
    />
  )
})((props) => ({
  flexDirection: 'row',
  '&.MuiAccordionSummary-root': {
    background: '#6E8BB733',
    borderRadius: '6px',
    minHeight: '40px',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    color: '#6E8BB7',
    margin: 0,
    fontSize: '14px',
    fontWeight: 500,
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  background: '#f3f6f9',
  borderRadius: '6px',
  padding: 0,
}))

export default function MenuAccordion({ title, children }) {
  const [expanded, setExpanded] = React.useState('panel1')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          {title}
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  )
}
