import {
  UserData,
  UserDataHeading,
  UserDataInfo,
  UserDataInner,
  UserImgWrapper,
  UserInfoImg,
  UserInfoWrapper,
  UserName,
  UserRoleName,
} from './useUserInfo.style'

import UserImage from '../../assets/images/user.png'
import { hoc } from '../../utils/hoc'
import { useUserInfoProps } from './userInfoProps'

export const UserInfo = hoc(useUserInfoProps, ({ user }) => {
  return (
    <UserInfoWrapper>
      <UserImgWrapper>
        <UserInfoImg
          src={user?.photo_url ? `${process.env.REACT_APP_CDN_IMAGE_URL}/${user?.photo_url}` : UserImage}
          width="120"
          height="120"
        />
      </UserImgWrapper>
      <UserName>{user?.surname + ' ' + user?.name + ' ' + user?.middle_name}</UserName>
      <UserRoleName>{user?.role_name}</UserRoleName>
      <UserData>
        <UserDataInner>
          <UserDataHeading>Manzil</UserDataHeading>
          <UserDataInfo>{user?.region?.ru_name}</UserDataInfo>
        </UserDataInner>
        <UserDataInner>
          <UserDataHeading>Telefon raqami</UserDataHeading>
          <UserDataInfo>{user?.phone}</UserDataInfo>
        </UserDataInner>
        <UserDataInner>
          <UserDataHeading>Ish joyi</UserDataHeading>
          <UserDataInfo>{user?.organization_name}</UserDataInfo>
        </UserDataInner>
      </UserData>
    </UserInfoWrapper>
  )
})
