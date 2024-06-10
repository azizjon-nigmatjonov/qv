export const colourStyles = ({ withBorder = true }) => ({
  control: (styles, state) => ({
    ...styles,
    backgroundColor: !withBorder ? 'transparent' : state.isDisabled ? '#F4F6FA' : 'white',
    boxShadow: 'none',
    borderColor: !withBorder ? 'transparent' : state.isFocused ? '#0E73F6' : '#E5E9EB',

    borderRadius: '6px',
    minHeight: '40px',
    '&:hover': {
      borderColor: !withBorder ? 'transparent' : '#0E73F6',
    },
    '&:focus': {
      borderColor: !withBorder ? 'transparent' : '#0E73F6',
    },
    transition: 'all 0.2s ease-in',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      cursor: isDisabled ? 'not-allowed' : 'default',
    }
  },
  container: (styles) => ({
    ...styles,
    // border: !withBorder ? 'none' : '1px solid #E5E9EB',
  }),
  multiValue: (base) => ({
    ...base,
    justifyContent: 'space-between',
    overflow: 'visible',
    whiteSpace: 'normal',
    width: '100%',
  }),
  multiValueLabel: (base) => ({
    ...base,
    whiteSpace: 'normal',
  }),
  indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
  menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  menuList: (styles) => ({ ...styles, zIndex: 9999 }),
  input: (styles) => ({ ...styles, fontSize: '14px' }),
  valueContainer: (styles) => ({ ...styles, padding: '2px 12px' }),
  placeholder: (styles) => ({ ...styles }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: '#303940',
    fontSize: '14px',
  }),
})
