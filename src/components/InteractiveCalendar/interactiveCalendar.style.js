import styled from '@emotion/styled'

export const WeekItem = styled.li``

export const CalendarBody = styled.ol``

export const CalendarItem = styled.li`
  display: flex;
  background-color: ${({ date, today }) =>
    date &&
    today.getDate() === date?.getDate() &&
    today.getMonth() === date?.getMonth() &&
    today.getFullYear() === date?.getFullYear()
      ? '#F4F6FA'
      : 'transparent'};

  &:not(:nth-of-type(7n + 7)) {
    border-right: 1px solid #e5e9eb;
  }
  &:not(:nth-of-type(1n + 29)) {
    border-bottom: 1px solid #e5e9eb;
  }
`

export const Spinner = styled.span`
  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: rotating 0.5s linear infinite;
`
