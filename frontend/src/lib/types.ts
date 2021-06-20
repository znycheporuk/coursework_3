export type UserRoles = 'notarius' | 'registrar'

export interface IRegisterNotarius {
  username: string
  fullName: string
  certificateNumber: number
  organizationName: string
  notarialRegion: string
  phoneNumber: number
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

export interface IPowerOfAttorney {
  id?: number
  series: string
  number: number
  issuedTo: string
  taxNumber: number
  validUntil: string
  active: boolean
  additionalInfo: string
  notariusId: string
  createdAt?: Date
  updatedAt?: Date
}