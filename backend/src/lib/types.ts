export type UserRoles = 'notarius' | 'registrar'

export interface UserSignUpData {
  name: string
  person: 'individual' | 'legal'
  IDN: string
  reasonOfAbsence: string
}

export interface IRegisterNotarius {
  username: string
  fullName: string
  certificateNumber: string
  organizationName: string
  notarialRegion: string
  phoneNumber: string
  certificationDate: string
  cardDate: string
  districtRegistrationDate: string
  place: string
  region: string
  password: string
}

export interface INotarius extends Omit<IRegisterNotarius, 'password'> {
  id: string
  active: boolean
}

export interface SignUpValues {
  username: string
  password: string
  role: UserRoles
}

export interface SignInValues {
  username: string
  password: string
}
