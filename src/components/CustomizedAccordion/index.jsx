import * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ isLast }) => ({
  '&:before': {
    display: 'none',
  },
  overflow: 'auto',
  borderBottom: isLast ? 'none' : '1px solid #e5e5e5',
  borderRadius: 0,
}))

const AccordionSummary = styled((props) => <MuiAccordionSummary expandIcon={<KeyboardArrowDownIcon />} {...props} />)(
  ({ expanded }) => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(180deg)',
      marginTop: '12px',
    },
    '& .MuiAccordionSummary-content': {
      margin: expanded ? '16px 0 6px' : '20px 0 20px',
      transition: '0.3s ease',
    },
  })
)

const AccordionDetails = styled((props) => <MuiAccordionDetails {...props} />)(() => ({
  padding: '6px 0px 16px',
}))

function CustomizedAccordion({ header, children, id, setActiveId, isLast }) {
  const [expanded, setExpanded] = React.useState('')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
    setActiveId(panel)
  }

  return (
    <Accordion isLast={isLast} expanded={expanded === id} onChange={handleChange(id)}>
      <AccordionSummary expanded={expanded === id} aria-controls={`${id}-content`} id={`${id}-header`}>
        <Typography fontSize={16} lineHeight="24px" fontWeight={600}>
          {header}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography fontSize={14} lineHeight="24px" color="#303940">
          {children}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export default CustomizedAccordion
