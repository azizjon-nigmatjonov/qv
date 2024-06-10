import styled from '@emotion/styled'

export const UserInfoWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  margin-top: 50px;
  padding: 0 20px;
  font-family: 'Inter';
  background-color: '#fff';
`
export const UserImgWrapper = styled.div`
  margin-bottom: 24px;
  text-align: center;
`

export const UserInfoImg = styled.img`
  width: 120px;
  height: 120px;
  display: inline-block;
  border-radius: 50%;
`
export const UserName = styled.h1`
  margin-top: 0;
  margin-bottom: 4px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: #000000;
`

export const UserRoleName = styled.p`
  margin-top: 0;
  margin-bottom: 31px;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
`

export const UserData = styled.dl``

export const UserDataInner = styled.div`
  display: flex;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`
export const UserDataHeading = styled.dt`
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  color: #48535b;
`
export const UserDataInfo = styled.dd`
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  color: #000000;
`
